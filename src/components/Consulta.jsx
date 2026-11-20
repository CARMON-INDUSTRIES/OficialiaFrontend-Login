"use client";
import { apiBase } from "@/lib/apiBase";
import { playNotificationSound } from "@/lib/notificationSounds";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import Layout from "@/components/Layout";
import DetalleModal from "@/components/DetalleModal";
import ModalEditar from "@/components/ModalEditar"; // Ajusta la ruta si es necesario
import { loadCurrentUser } from "@/lib/currentUser";
import axios from "axios";
import Swal from "sweetalert2";

const Dashboard = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [communityFilter, setCommunityFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [exporting, setExporting] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [busy, setBusy] = useState(false);
  const [records, setRecords] = useState([]);
  const [loadingRecords, setLoadingRecords] = useState(true);
  const [recordsError, setRecordsError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [editData, setEditData] = useState({});
  const [editError, setEditError] = useState("");
  const [isSavingEdit, setIsSavingEdit] = useState(false);
  const [comunidades, setComunidades] = useState([]);
  const [areas, setAreas] = useState([]);
  const [importancias, setImportancias] = useState([]);
  const [status, setStatus] = useState([]);
  const [userRole, setUserRole] = useState("");

// Agregamos un estado para almacenar el último estado
const [lastStatus, setLastStatus] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      fetchUserRole(token);
    }
  }, [router]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Llamada inicial
      fetchRecords(token);
      
      // Establece el intervalo para polling
      const interval = setInterval(() => {
        fetchRecords(token);
      }, 5000); // Cada 5 segundos
  
      // Limpia el intervalo cuando el componente se desmonte
      return () => clearInterval(interval);
    }
  }, []);
  

  useEffect(() => {
    if (showEditModal) {
      fetchData();
    }
  }, [showEditModal]);


  // Detectamos cambios en el status
  useEffect(() => {
    const hasStatusChanged = records.some(
      (record, index) =>
        lastStatus[index] !== record.statusDescripcion // Compara el nuevo status con el anterior
    );
    
    if (hasStatusChanged) {
      playNotificationSound("/sounds/status.mp3");
      setLastStatus(records.map((record) => record.statusDescripcion)); // Actualiza el último estado
    }
  }, [records, lastStatus]);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    try {
      const [comResp, areasResp, impResp, statusResp] = await Promise.all([
        axios.get(
          apiBase + "/Correspondencia/obtener-comunidades",
          { headers: { Authorization: `Bearer ${token}` } }
        ),
        axios.get(
          apiBase + "/Correspondencia/obtener-areas",
          { headers: { Authorization: `Bearer ${token}` } }
        ),
        axios.get(
          apiBase + "/Correspondencia/obtener-importancia",
          { headers: { Authorization: `Bearer ${token}` } }
        ),
        axios.get(
          apiBase + "/Correspondencia/obtener-status",
          { headers: { Authorization: `Bearer ${token}` } }
        ),
      ]);

      setComunidades(comResp.data);
      setAreas(areasResp.data);
      setImportancias(impResp.data);
      setStatus(statusResp.data);
    } catch (error) {
      console.error("Error al obtener datoss:", error);
    }
  };

  const fetchUserRole = async (token) => {
    try {
      const user = await loadCurrentUser(token);
      setUserRole(user.roles || []);
    } catch (error) {
      console.error("No se pudo consultar el usuario actual.", error);
    }
  };

  const fetchRecords = async (token) => {
    try {
      const user = await loadCurrentUser(token);
      const userId = user.id;
      if (!userId) return;

      // Obtener registros con userId
      const response = await axios.get(
        `${apiBase}/Correspondencia/obtener?userId=${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!Array.isArray(response.data)) {
        return;
      }

      // Filtrar registros por área del usuario
      const userRecords = response.data;

      // Ordenar los registros por fecha descendente
      const sortedRecords = userRecords.sort(
        (a, b) => new Date(b.fecha) - new Date(a.fecha)
      );

      setRecords(sortedRecords);
      setRecordsError("");
    } catch (error) {
      setRecordsError("No se pudieron cargar los oficios. Inténtalo de nuevo.");
      console.error(
        "Error en fetchRecords:",
        error.response?.data || error.message
      );
    } finally {
      setLoadingRecords(false);
    }
  };

  const canDelete = userRole.includes("Admin") || userRole.includes("SuperAdmin");

  const handleDeleteConfirmation = async (ids) => {
    if (!canDelete || busy || !ids.length) return;

    const confirmation = await Swal.fire({
      title: ids.length === 1 ? "¿Eliminar este oficio?" : "¿Eliminar " + ids.length + " oficios?",
      text: "Esta acción es permanente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#691B31",
    });
    if (!confirmation.isConfirmed) return;

    setBusy(true);
    const token = localStorage.getItem("token");
    const deleted = new Set();
    for (const id of ids) {
      try {
        await axios.delete(
          apiBase + "/Correspondencia/eliminar/" + id,
          { headers: { Authorization: "Bearer " + token } }
        );
        deleted.add(id);
      } catch {
        // Se mantiene este campo para que el usuario pueda reintentar
      }
    }
    setRecords((previous) => previous.filter((record) => !deleted.has(record.id)));
    setSelectedIds((previous) => previous.filter((id) => !deleted.has(id)));
    setBusy(false);

    const failed = ids.length - deleted.size;
    await Swal.fire({
      icon: failed ? "warning" : "success",
      title: failed ? "Eliminación incompleta" : "Eliminación completada",
      text: "Eliminados: " + deleted.size + ". Pendientes: " + failed + ".",
      confirmButtonColor: "#691B31",
    });
  };

  const downloadRecords = async (items) => {
    if (busy || !items.length) return;
    setBusy(true);
    try {
      const { downloadCorrespondencias } = await import("@/lib/correspondenciaPdf");
      await downloadCorrespondencias(items);
    } catch {
      await Swal.fire({ icon: "error", title: "No se pudo generar la descarga", text: "Inténtalo de nuevo." });
    } finally {
      setBusy(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (isSavingEdit) return;
    setIsSavingEdit(true);
    setEditError("");
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `${apiBase}/Correspondencia/editar/${editData.id}`,
        { ...editData, fechaTerminacion: editData.fechaTerminacion || null },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      closeEditModal();
      Swal.fire({
        icon: "success",
        title: "Registro actualizado",
        text: "Los cambios se han guardado exitosamente.",
        confirmButtonColor: "#691B31",
      });

      fetchRecords(token); // Vuelve a cargar los registros actualizados
    } catch {
      setEditError("No se pudieron guardar los cambios. Inténtalo de nuevo.");
    } finally {
      setIsSavingEdit(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleView = (record) => {
    setSelectedRecord(record);
    setShowModal(true);
  };

  const handleEdit = (record) => {
    setSelectedRecord(record);
    setEditData(record);
    setEditError("");
    setShowEditModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedRecord(null);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditData({});
  };

  // Formateo de la fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString); // Convierte la cadena en un objeto Date
    return date.toLocaleDateString("es-ES", {
      // Formatea la fecha
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const communityOptions = [...new Map(records.filter((record) => record.comunidad != null)
    .map((record) => [String(record.comunidad), record.comunidadDescripcion || "Comunidad " + record.comunidad])).entries()];
  const statusOptions = [...new Map(records.filter((record) => record.status != null)
    .map((record) => [String(record.status), record.statusDescripcion || "Estado " + record.status])).entries()];

  const exportExcel = async () => {
    if (exporting) return;
    setExporting(true);
    try {
      const { exportOficios } = await import("@/lib/exportOficios");
      await exportOficios(filteredRecords);
    } catch {
      Swal.fire({ icon: "error", title: "No se pudo generar el Excel", text: "Inténtalo de nuevo." });
    } finally {
      setExporting(false);
    }
  };

  const searchText = search.trim().toLowerCase();
  const filteredRecords = records.filter((record) => {
    const date = record.fecha?.slice(0, 10) || "";
    return (!startDate || (date && date >= startDate))
      && (!endDate || (date && date <= endDate))
      && (!communityFilter || String(record.comunidad) === communityFilter)
      && (!statusFilter || String(record.status) === statusFilter)
      && [
        record.folio, record.fecha && formatDate(record.fecha), record.dependencia,
        record.asunto, record.areaDescripcion, record.statusDescripcion, record.comunidadDescripcion,
      ].some((value) => String(value ?? "").toLowerCase().includes(searchText));
  });

  const selectedRecords = filteredRecords.filter(({ id }) => selectedIds.includes(id));
  const allVisibleSelected = filteredRecords.length > 0 && selectedRecords.length === filteredRecords.length;

  const toggleRecord = (id) => {
    setSelectedIds((previous) => previous.includes(id)
      ? previous.filter((selectedId) => selectedId !== id)
      : [...previous, id]);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "registrado":
        return "text-gray-700"; // Gris
      case "entregado":
        return "text-blue-700"; // Azul
      case "leido":
        return "text-orange-500"; // Naranja
      case "en proceso":
        return "text-red-700"; // Rojo
      case "finalizado":
        return "text-green-700"; // Verde
      default:
        return "text-black"; // Color por defecto
    }
  };

  return (
    <Layout>
      <div className="municipal-page">
        <div className="municipal-panel">
          <h1 className="municipal-title">Registro de oficios</h1>
          <div className="flex flex-wrap items-end gap-3">
            <label className="grid w-full max-w-md gap-1 text-sm font-semibold">
              Buscar oficios
              <input
                type="search"
                placeholder="Folio, asunto, estado o comunidad"
                className="min-h-11 rounded-md border bg-white px-3 font-normal"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setSelectedIds([]);
                }}
              />
            </label>
            <label className="grid gap-1 text-sm font-semibold">
              Desde (opcional)
              <input type="date" value={startDate} max={endDate || undefined}
                className="min-h-11 rounded-md border bg-white px-3 font-normal"
                onChange={(event) => { setStartDate(event.target.value); setSelectedIds([]); }} />
            </label>
            <label className="grid gap-1 text-sm font-semibold">
              Hasta (opcional)
              <input type="date" value={endDate} min={startDate || undefined}
                className="min-h-11 rounded-md border bg-white px-3 font-normal"
                onChange={(event) => { setEndDate(event.target.value); setSelectedIds([]); }} />
            </label>
            <label className="grid gap-1 text-sm font-semibold">
              Comunidad
              <select value={communityFilter} className="min-h-11 rounded-md border bg-white px-3 font-normal"
                onChange={(event) => { setCommunityFilter(event.target.value); setSelectedIds([]); }}>
                <option value="">Todas las comunidades</option>
                {communityOptions.map(([id, label]) => <option key={id} value={id}>{label}</option>)}
              </select>
            </label>
            <label className="grid gap-1 text-sm font-semibold">
              Status
              <select value={statusFilter} className="min-h-11 rounded-md border bg-white px-3 font-normal"
                onChange={(event) => { setStatusFilter(event.target.value); setSelectedIds([]); }}>
                <option value="">Todos los status</option>
                {statusOptions.map(([id, label]) => <option key={id} value={id}>{label}</option>)}
              </select>
            </label>
            {(search || startDate || endDate || communityFilter || statusFilter) && (
              <button
                type="button"
                className="municipal-secondary"
                onClick={() => {
                  setSearch("");
                  setStartDate("");
                  setEndDate("");
                  setCommunityFilter("");
                  setStatusFilter("");
                  setSelectedIds([]);
                }}
              >
                Limpiar filtros
              </button>
            )}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2" aria-busy={busy}>
            <p className="mr-auto text-sm" role="status">
              {loadingRecords ? "Cargando oficios…" : filteredRecords.length + " oficios"} · {selectedRecords.length} seleccionados
            </p>
            <button type="button" className="municipal-secondary disabled:opacity-50"
              disabled={exporting || !filteredRecords.length || (startDate && endDate && startDate > endDate)}
              onClick={exportExcel}>
              {exporting ? "Generando Excel…" : "Descargar Excel"}
            </button>
            <button type="button" className="municipal-secondary disabled:opacity-50"
              disabled={busy || !selectedRecords.length} onClick={() => downloadRecords(selectedRecords)}>
              Descargar PDF{selectedRecords.length > 1 ? "s (ZIP)" : ""}
            </button>
            {canDelete && (
              <button type="button" className="municipal-primary disabled:opacity-50"
                disabled={busy || !selectedRecords.length}
                onClick={() => handleDeleteConfirmation(selectedRecords.map(({ id }) => id))}>
                Eliminar selección
              </button>
            )}
          </div>
          {recordsError && <p role="alert" className="mt-3 text-red-800">{recordsError}</p>}
          <div className="municipal-table" tabIndex={0} aria-label="Oficios registrados">
            <table className="min-w-full bg-white">
              <thead className="sticky top-0 z-10">
                <tr>
                  <th className="px-3 py-3">
                    <input type="checkbox" aria-label="Seleccionar todos los oficios visibles"
                      checked={allVisibleSelected}
                      ref={(input) => { if (input) input.indeterminate = selectedRecords.length > 0 && !allVisibleSelected; }}
                      disabled={busy || !filteredRecords.length}
                      onChange={() => setSelectedIds(allVisibleSelected ? [] : filteredRecords.map(({ id }) => id))} />
                  </th>
                  <th className="py-3 px-6 text-left">Folio</th>
                  <th className="py-3 px-6 text-left">Fecha</th>
                  <th className="py-3 px-6 text-left">Dependencia</th>
                  <th className="py-3 px-6 text-left">Asunto</th>
                  <th className="py-3 px-6 text-left">Comunidad</th>
                  <th className="py-3 px-6 text-left">Área de destino</th>
                  <th className="py-3 px-6 text-left">Status</th>
                  <th className="py-3 px-6 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {!loadingRecords && !recordsError && !filteredRecords.length && (
                  <tr><td colSpan={9} className="p-6 text-center">No se encontraron oficios.</td></tr>
                )}
                {filteredRecords.map((record) => (
                  <tr
                    key={record.id}
                    className="border-b"
                  >
                    <td className="px-3 py-3 text-center">
                      <input type="checkbox" aria-label={"Seleccionar oficio " + record.folio}
                        checked={selectedIds.includes(record.id)} disabled={busy} onChange={() => toggleRecord(record.id)} />
                    </td>
                    <td className="py-3 px-6">{record.folio}</td>
                    <td className="py-3 px-6">
                      {record.fecha
                        ? formatDate(record.fecha)
                        : "Fecha no disponible"}
                    </td>
                    <td className="py-3 px-6">{record.dependencia}</td>
                    <td className="py-3 px-6">{record.asunto}</td>
                    <td className="py-3 px-6">{record.comunidadDescripcion}</td>
                    <td className="py-3 px-6">{record.areaDescripcion}</td>
                    <td
                      className={`py-3 px-6 font-bold ${getStatusColor(
                        record.statusDescripcion
                      )}`}
                    >
                      {record.statusDescripcion}
                    </td>

                    <td className="py-3 px-6">
                      <div className="flex items-center justify-center gap-3">
                      <button type="button" className="municipal-secondary whitespace-nowrap"
                        disabled={busy} onClick={() => downloadRecords([record])}>
                        PDF
                      </button>
                      <button
                        className="text-blue-500 hover:underline"
                        aria-label="Ver oficio"
                        onClick={() => handleView(record)}
                      >
                        <FaEye aria-hidden="true" />
                      </button>
                      
                          <button
                            className="text-green-500 hover:underline"
                            aria-label="Editar oficio"
                            onClick={() => handleEdit(record)}
                          >
                            <FaEdit />
                          </button>
                          {canDelete && (
                        <>
                          <button
                            className="text-red-500 hover:underline"
                            aria-label="Eliminar oficio"
                            disabled={busy}
                            onClick={() => handleDeleteConfirmation([record.id])}
                          >
                            <FaTrashAlt />
                          </button>
                        </>
                      )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {showModal && selectedRecord && (
            <DetalleModal
              selectedRecord={selectedRecord}
              closeModal={closeModal}
            />
          )}

          <ModalEditar
            showEditModal={showEditModal}
            closeModal={closeEditModal}
            selectedRecord={selectedRecord}
            comunidades={comunidades}
            areas={areas}
            importancias={importancias}
            status={status}
            handleChange={handleChange}
            setEditData={setEditData}
            handleEditSubmit={handleEditSubmit} // Ahora sí está definida
            editData={editData}
            error={editError}
            isSaving={isSavingEdit}
            canEditIdentification={canDelete}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
