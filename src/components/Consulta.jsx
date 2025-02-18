"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import Layout from "@/components/Layout";
import axios from "axios";
import Swal from "sweetalert2";
import VisualizarPDF from "./VisualizarPDF";

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
  const [numPages, setNumPages] = useState(null);

  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else if (records.length === 0) {
      fetchRecords(token);
    }
  }, []);

  useEffect(() => {
    if (showEditModal) {
      fetchData();
    }
  }, [showEditModal]);

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
      console.error("Error al obtener datos:", error);
    }
  };

  const fetchRecords = async (token) => {
    try {
      const response = await axios.get(
        "https://oficialialoginbackend.somee.com/api/Correspondencia/obtener",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Datos obtenidos:", response.data);

      setRecords(response.data);
    } catch (error) {
      console.error("Error al obtener registros:", error);
    }
  };

  const handleDeleteConfirmation = (folio) => {
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
            `https://oficialialoginbackend.somee.com/api/Correspondencia/obtener${folio}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setRecords(records.filter((record) => record.folio !== folio));
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value, // Actualiza el valor seleccionado
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

  // Lógica de filtrado mejorada para incluir 'fecha', 'dependencia', 'asunto', 'estatus', y 'folio'
  const filteredRecords = [
    ...new Map(records.map((item) => [item.folio, item])).values(),
  ].filter((record) => {
    const searchLower = search.toLowerCase();
    return (
      String(record.folio).includes(search) ||
      (record.fecha && record.fecha.toLowerCase().includes(searchLower)) ||
      (record.dependencia &&
        record.dependencia.toLowerCase().includes(searchLower)) ||
      (record.asunto && record.asunto.toLowerCase().includes(searchLower)) ||
      (record.status?.toString().toLowerCase().includes(searchLower))

    );
  });

  // Dentro del componente
  const formatDate = (dateString) => {
    const date = new Date(dateString); // Convierte la cadena en un objeto Date
    return date.toLocaleDateString("es-ES", {
      // Formatea la fecha
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
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
                  <th className="py-3 px-6 text-left">Status</th>
                  <th className="py-3 px-6 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredRecords.map((record) => (
                  <tr key={record.folio} className="border-b">
                    <td className="py-3 px-6">{record.folio}</td>
                    <td className="py-3 px-6">
                      {record.fecha
                        ? formatDate(record.fecha)
                        : "Fecha no disponible"}
                    </td>
                    <td className="py-3 px-6">{record.dependencia}</td>
                    <td className="py-3 px-6">{record.asunto}</td>
                    <td className="py-3 px-6">{record.statusDescripcion}</td>
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
                      <button
                        className="text-red-500 hover:underline"
                        onClick={() => handleDeleteConfirmation(record.folio)}
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {showModal && selectedRecord && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[50]">
              <div className="bg-white rounded-lg w-full max-w-4xl md:max-w-2xl lg:max-w-3xl flex flex-col md:flex-row overflow-hidden">
                <div className="w-full md:w-1/3">
                  <img
                    src="/images/consulta.jpeg"
                    alt="Registro"
                    className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                  />
                </div>
                <div className="w-full md:w-2/3 p-6 flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-4 text-[#691B31]">
                      Detalles del Registro
                    </h2>
                    <p className="text-lg mb-2">
                      <span className="font-bold">Folio:</span>{" "}
                      {selectedRecord.folio}
                    </p>
                    <p className="text-lg mb-2">
                      <span className="font-bold">Fecha:</span>{" "}
                      {selectedRecord.fecha}
                    </p>
                    <p className="text-lg mb-2">
                      <span className="font-bold">Dependencia:</span>{" "}
                      {selectedRecord.dependencia}
                    </p>
                    <p className="text-lg mb-2">
                      <span className="font-bold">Comunidad:</span>{" "}
                      {selectedRecord.comunidadDescripcion}
                    </p>
                    <p className="text-lg mb-2">
                      <span className="font-bold">Remitente:</span>{" "}
                      {selectedRecord.remitente}
                    </p>
                    <p className="text-lg mb-2">
                      <span className="font-bold">Cargo Remitente:</span>{" "}
                      {selectedRecord.cargoRemitente}
                    </p>
                    <p className="text-lg mb-2">
                      <span className="font-bold">Asunto:</span>{" "}
                      {selectedRecord.asunto}
                    </p>
                    <p className="text-lg mb-2">
                      <span className="font-bold">Destinatario:</span>{" "}
                      {selectedRecord.destinatario}
                    </p>
                    <p className="text-lg mb-2">
                      <span className="font-bold">Cargo Destinatario:</span>{" "}
                      {selectedRecord.cargoDestinatario}
                    </p>
                    <p className="text-lg mb-2">
                      <span className="font-bold">Área(s) turnada(s):</span>{" "}
                      {selectedRecord.areaDescripcion}
                    </p>
                    <p className="text-lg mb-2">
                      <span className="font-bold text-red-600">
                        Importancia:
                      </span>{" "}
                      {selectedRecord.importanciaDescripcion}
                    </p>
                    <p className="text-lg mb-2">
                      <span className="font-bold text-[#621132]">Status:</span>{" "}
                      {selectedRecord.statusDescripcion}
                    </p>

                    
                  </div>
                  <div className="flex justify-end mt-4">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 bg-[#BC995B] text-white rounded-lg hover:bg-[#A87F50]"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {showEditModal && selectedRecord && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[50]">
              <div className="bg-gradient-to-br from-[#BC995B] to-[#ffffff] rounded-lg w-full max-w-3xl p-6 shadow-xl relative">
                {/* Encabezado con animación */}
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-[#000000]">
                    Editar Registro
                  </h2>
                  <div className="text-[#000000] text-3xl animate-spin">
                    <FaEdit />
                  </div>
                </div>

                {/* Formulario */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    // Simulación de guardado
                    const success = Math.random() > 0.2; // 80% éxito, 20% error
                    if (success) {
                      Swal.fire({
                        icon: "success",
                        title: "¡Éxito!",
                        text: "Cambios guardados exitosamente",
                        confirmButtonColor: "#BC995B",
                      });
                    } else {
                      Swal.fire({
                        icon: "error",
                        title: "¡Error!",
                        text: " Ha ocurrido un error",
                        confirmButtonColor: "#BC995B",
                      });
                    }
                  }}
                >
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-gray-700 font-bold">
                        Folio
                      </label>
                      <input
                        type="text"
                        className="input-field"
                        value={selectedRecord.folio}
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-bold">
                        Fecha
                      </label>
                      <input
                        type="date"
                        className="input-field"
                        defaultValue={selectedRecord.fecha}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-bold">
                        Dependencia
                      </label>
                      <input
                        type="text"
                        className="input-field"
                        defaultValue={selectedRecord.dependencia}
                      />
                    </div>
                    {/* Comunidad - Dropdown */}
                    <div>
                      <label className="block text-gray-700 font-bold">
                        Comunidad
                      </label>
                      <input
                        type="text"
                        className="input-field mb-2"
                        defaultValue={selectedRecord.comunidadDescripcion}
                        disabled // Solo para mostrar el valor actual sin edición
                      />
                      <select
                        name="comunidad"
                        onChange={handleChange}
                        className="w-full p-2 border rounded border-[#691B31]"
                        value={editData.comunidad || selectedRecord.idComunidad} // Carga el valor actual de la API
                      >
                        <option value="">Seleccionar Comunidad</option>
                        {comunidades.map((com) => (
                          <option key={com.idComunidad} value={com.idComunidad}>
                            {com.nombreComunidad}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-bold">
                        Remitente
                      </label>
                      <input
                        type="text"
                        className="input-field"
                        defaultValue={selectedRecord.remitente}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-bold">
                        Cargo Remitente
                      </label>
                      <input
                        type="text"
                        className="input-field"
                        defaultValue={selectedRecord.cargoRemitente}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-bold">
                        Asunto
                      </label>
                      <input
                        type="text"
                        className="input-field"
                        defaultValue={selectedRecord.asunto}
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-bold">
                        Destinatario
                      </label>
                      <input
                        type="text"
                        className="input-field"
                        defaultValue={selectedRecord.destinatario}
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-bold">
                        Cargo Destinatario
                      </label>
                      <input
                        type="text"
                        className="input-field"
                        defaultValue={selectedRecord.cargoDestinatario}
                      />
                    </div>
                    {/* Área - Dropdown */}
                    <div>
                      <label className="block text-gray-700 font-bold">
                        Área
                      </label>
                      <input
                        type="text"
                        className="input-field"
                        defaultValue={selectedRecord.areaDescripcion}
                      />
                    </div>
                    {/* Importancia - Dropdown */}
                    <div>
                      <label className="block text-gray-700 font-bold">
                        Importancia
                      </label>
                      <input
                        type="text"
                        className="input-field"
                        defaultValue={selectedRecord.importanciaDescripcion}
                      />
                    </div>

                    {/* Status - Dropdown */}
                    <div>
                      <label className="block text-gray-700 font-bold">
                        Status
                      </label>
                      <input
                        type="text"
                        className="input-field"
                        defaultValue={selectedRecord.statusDescripcion}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-bold">
                        Documento
                      </label>
                      <input
                        type="text"
                        className="input-field"
                        defaultValue={selectedRecord.documento}
                      />
                    </div>
                  </div>

                  {/* Botones */}
                  <div className="flex justify-end mt-6">
                    <button
                      type="button"
                      className="btn-red mr-2"
                      onClick={() => setShowEditModal(false)}
                    >
                      Cancelar
                    </button>
                    <button type="submit" className="btn-gold">
                      Guardar Cambios
                    </button>
                  </div>
                </form>
              </div>

              {/* Estilos JSX */}
              <style jsx>{`
                .input-field {
                  width: 100%;
                  padding: 8px;
                  border: 1px solid #bc995b;
                  border-radius: 8px;
                  outline: none;
                  transition: 0.3s;
                }
                .input-field:focus {
                  border-color: #a87f50;
                  box-shadow: 0 0 5px rgba(188, 153, 91, 0.5);
                }
                .btn-red {
                  background-color: red;
                  color: white;
                  padding: 8px 16px;
                  border-radius: 8px;
                  transition: 0.3s;
                }
                .btn-red:hover {
                  background-color: darkred;
                }
                .btn-gold {
                  background-color: #bc995b;
                  color: white;
                  padding: 8px 16px;
                  border-radius: 8px;
                  transition: 0.3s;
                }
                .btn-gold:hover {
                  background-color: #a87f50;
                }
              `}</style>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
