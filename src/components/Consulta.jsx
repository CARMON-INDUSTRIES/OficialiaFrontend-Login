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
    if (showEditModal) {
      fetchData();
    }
  }, [showEditModal]);

  useEffect(() => {
    if (selectedRecord) {
      setEditData(selectedRecord); // Carga los datos del registro seleccionado
    }
  }, [selectedRecord]);

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
      console.log("UserId obtenido del backend:", userId);

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

  const handleDeleteConfirmation = (id) => {
    Swal.fire({
      title: "¿Estás seguro de querer eliminar este registro?",
      text: "¡Esta acción no se puede deshacer!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, cancelar",
      confirmButtonColor: "#691B31",
      cancelButtonColor: "#d33",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          const token = localStorage.getItem("token");
          await axios.delete(
            `https://oficialialoginbackend.somee.com/api/Correspondencia/eliminar/${id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setRecords(records.filter((record) => record.id !== id));
          Swal.fire({
            icon: "success",
            title: "Registro eliminado",
            text: "El registro ha sido eliminado exitosamente.",
            confirmButtonColor: "#691B31",
          });
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "¡Error!",
            text: "Ha ocurrido un error al eliminar el registro.",
            confirmButtonColor: "#691B31",
          });
        }
      },
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    console.log("Editando registro:", editData);
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

  // Lógica de filtrado mejorada para incluir 'fecha', 'dependencia', 'asunto', 'estatus', y 'folio'
  const filteredRecords = records
    .filter((record) => {
      const searchLower = search.toLowerCase();
      const formattedDate = record.fecha ? formatDate(record.fecha) : ""; // Formateamos la fecha antes de filtrar
      return (
        String(record.folio).includes(search) ||
        formattedDate.includes(search) ||
        (record.dependencia &&
          record.dependencia.toLowerCase().includes(searchLower)) ||
        (record.asunto && record.asunto.toLowerCase().includes(searchLower)) ||
        (record.areaDescripcion &&
          record.areaDescripcion.toLowerCase().includes(searchLower)) ||
        record.statusDescripcion
          .toString()
          .toLowerCase()
          .includes(searchLower) ||
        (record.area &&
          typeof record.area === "string" &&
          record.area.toLowerCase().includes(searchLower)) // Verificación de tipo para 'area'
      );
    })
    .reduce((acc, record) => {
      // Aquí solo agregamos registros con el mismo folio si pertenecen a un área diferente
      const existingRecord = acc.find(
        (item) => item.folio === record.folio && item.area === record.area
      );
      if (!existingRecord) {
        acc.push(record); // Si no existe el registro, lo agregamos
      }
      return acc;
    }, []);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
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
      <div className="h-full w-full flex flex-col items-center bg-gradient-to-br from-[#ffffff] to-[#BC995B] p-6">
        <div className="bg-white shadow-lg rounded-lg w-full max-w-8xl p-6 overflow-hidden">
          <h1 className="text-3xl font-bold mb-4">Inicio</h1>
          <input
            type="text"
            placeholder="Buscar registros..."
            className="w-full max-w-md px-4 py-2 border border-[#691B31] rounded-lg focus:outline-none focus:border-[#BC995B]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="overflow-y-auto max-h-[500px] mt-6 border rounded-lg">
            <table className="min-w-full bg-white">
              <thead className="bg-[#BC995B] text-white sticky top-0 z-10">
                <tr>
                  <th className="py-3 px-6 text-left">Folio</th>
                  <th className="py-3 px-6 text-left">Fecha</th>
                  <th className="py-3 px-6 text-left">Dependencia</th>
                  <th className="py-3 px-6 text-left">Asunto</th>
                  <th className="py-3 px-6 text-left">Area turnada</th>
                  <th className="py-3 px-6 text-left">Status</th>
                  <th className="py-3 px-6 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredRecords.map((record, index) => (
                  <tr
                    key={`${record.folio}-${record.area}-${index}`}
                    className="border-b"
                  >
                    <td className="py-3 px-6">{record.folio}</td>
                    <td className="py-3 px-6">
                      {record.fecha
                        ? formatDate(record.fecha)
                        : "Fecha no disponible"}
                    </td>
                    <td className="py-3 px-6">{record.dependencia}</td>
                    <td className="py-3 px-6">{record.asunto}</td>
                    <td className="py-3 px-6">{record.areaDescripcion}</td>
                    <td
                      className={`py-3 px-6 font-bold ${getStatusColor(
                        record.statusDescripcion
                      )}`}
                    >
                      {record.statusDescripcion}
                    </td>

                    <td className="py-3 px-6 flex justify-center gap-4">
                      <button
                        className="text-blue-500 hover:underline"
                        onClick={() => handleView(record)}
                      >
                        <FaEye />
                      </button>
                      
                          <button
                            className="text-green-500 hover:underline"
                            onClick={() => handleEdit(record)}
                          >
                            <FaEdit />
                          </button>
                          {(userRole.includes("Admin") ||
                        userRole.includes("SuperAdmin")) && (
                        <>
                          <button
                            className="text-red-500 hover:underline"
                            onClick={() => handleDeleteConfirmation(record.id)}
                          >
                            <FaTrashAlt />
                          </button>
                        </>
                      )}
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
