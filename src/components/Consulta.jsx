"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import Layout from "@/components/Layout";
import DetalleModal from "@/components/DetalleModal";
import ModalEditar from "@/components/ModalEditar"; // Ajusta la ruta si es necesario
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Swal from "sweetalert2";

const Dashboard = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [busy, setBusy] = useState(false);
  const [records, setRecords] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [editData, setEditData] = useState({});
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
      fetchRecords(token);
    }
  }, []);

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

  useEffect(() => {
    if (selectedRecord) {
      setEditData(selectedRecord); // Carga los datos del registro seleccionado
    }
  }, [selectedRecord]);

  // Detectamos cambios en el status
  useEffect(() => {
    const hasStatusChanged = records.some(
      (record, index) =>
        lastStatus[index] !== record.statusDescripcion // Compara el nuevo status con el anterior
    );
    
    if (hasStatusChanged) {
      const audio = new Audio("/sounds/status.mp3"); // Reproduce el sonido
      audio.play();
      setLastStatus(records.map((record) => record.statusDescripcion)); // Actualiza el último estado
    }
  }, [records, lastStatus]);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    try {
      const [comResp, areasResp, impResp, statusResp] = await Promise.all([
        axios.get(
          "https://oficialialoginbackend.somee.com/api/Correspondencia/obtener-comunidades",
          { headers: { Authorization: `Bearer ${token}` } }
        ),
        axios.get(
          "https://oficialialoginbackend.somee.com/api/Correspondencia/obtener-areas",
          { headers: { Authorization: `Bearer ${token}` } }
        ),
        axios.get(
          "https://oficialialoginbackend.somee.com/api/Correspondencia/obtener-importancia",
          { headers: { Authorization: `Bearer ${token}` } }
        ),
        axios.get(
          "https://oficialialoginbackend.somee.com/api/Correspondencia/obtener-status",
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
      const decodedToken = jwtDecode(token);
      const userName =
        decodedToken[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ];

      if (!userName) {
        console.error("Error: userName es undefined");
        return;
      }

      const response = await axios.get(
        "https://oficialialoginbackend.somee.com/api/Roles/GetUsersWithRoles",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = response.data.find((u) => u.userName === userName);
      if (user) {
        setUserRole(user.roles);
      } else {
        console.error("No se encontró el usuario en la lista de roles");
      }
    } catch (error) {
      console.error("Error al obtener el rol del usuario:", error);
    }
  };

  const fetchRecords = async (token) => {
    try {
      const decodedToken = jwtDecode(token);
      const userName =
        decodedToken[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ];

      if (!userName) return;

      // Obtener userId
      const userIdResponse = await axios.get(
        `https://oficialialoginbackend.somee.com/api/Cuentas/GetUserId/${userName}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const userId = userIdResponse.data.userId;

      if (!userId) {
        console.error("Error: No se obtuvo userId del backend");
        return;
      }

      // Obtener registros con userId
      const response = await axios.get(
        `https://oficialialoginbackend.somee.com/api/Correspondencia/obtener?userId=${userId}`,
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
    } catch (error) {
      console.error(
        "Error en fetchRecords:",
        error.response?.data || error.message
      );
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
          "https://oficialialoginbackend.somee.com/api/Correspondencia/eliminar/" + id,
          { headers: { Authorization: "Bearer " + token } }
        );
        deleted.add(id);
      } catch {
        // Keep this record selected so the user can retry.
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
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `https://oficialialoginbackend.somee.com/api/Correspondencia/editar/${editData.id}`,
        editData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Registro actualizado",
        text: "Los cambios se han guardado exitosamente.",
        confirmButtonColor: "#691B31",
      });

      setShowEditModal(false);
      fetchRecords(token); // Vuelve a cargar los registros actualizados
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: "Hubo un problema al actualizar el registro.",
        confirmButtonColor: "#691B31",
      });
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

  const searchText = search.trim().toLowerCase();
  const filteredRecords = records.filter((record) => {
    const date = record.fecha?.slice(0, 10) || "";
    return (!filterDate || date === filterDate)
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
              Fecha de registro (opcional)
              <input
                type="date"
                value={filterDate}
                className="min-h-11 rounded-md border bg-white px-3 font-normal"
                onChange={(event) => {
                  setFilterDate(event.target.value);
                  setSelectedIds([]);
                }}
              />
            </label>
            {(search || filterDate) && (
              <button
                type="button"
                className="municipal-secondary"
                onClick={() => {
                  setSearch("");
                  setFilterDate("");
                  setSelectedIds([]);
                }}
              >
                Limpiar filtros
              </button>
            )}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2" aria-busy={busy}>
            <p className="mr-auto text-sm" role="status">
              {filteredRecords.length} oficios · {selectedRecords.length} seleccionados
            </p>
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
                  <th className="py-3 px-6 text-left">Estado</th>
                  <th className="py-3 px-6 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {!filteredRecords.length && (
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
            setShowEditModal={setShowEditModal}
            selectedRecord={selectedRecord}
            comunidades={comunidades}
            importancias={importancias}
            status={status}
            handleChange={(e) =>
              setEditData({ ...editData, [e.target.name]: e.target.value })
            }
            handleEditSubmit={handleEditSubmit} // Ahora sí está definida
            editData={editData}
            userRoles={userRole}  // Pasa los roles al modal
          />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
