"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import Layout from "@/components/Layout";
import axios from "axios";

const Dashboard = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [records, setRecords] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      fetchRecords(token);
    }
  }, []);

  const fetchRecords = async (token) => {
    try {
      const response = await axios.get(
        "https://oficialialoginbackend.somee.com/api/Correspondencia/obtener",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRecords(response.data);
    } catch (error) {
      console.error("Error al obtener registros:", error);
    }
  };

  const handleDelete = async (folio) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://oficialialoginbackend.somee.com/api/Correspondencia/obtener${folio}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRecords(records.filter((record) => record.folio !== folio));
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
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
          <div className="overflow-auto max-h-[500px] mt-6">
            <table className="min-w-full bg-white rounded-lg overflow-hidden">
              <thead className="bg-[#BC995B] text-white">
                <tr>
                  <th className="py-3 px-6 text-left">Folio</th>
                  <th className="py-3 px-6 text-left">Fecha</th>
                  <th className="py-3 px-6 text-left">Dependencia</th>
                  <th className="py-3 px-6 text-left">Asunto</th>
                  <th className="py-3 px-6 text-left">Status</th>
                  <th className="py-3 px-6 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record.folio} className="border-b">
                    <td className="py-3 px-6">{record.folio}</td>
                    <td className="py-3 px-6">{record.fecha}</td>
                    <td className="py-3 px-6">{record.dependencia}</td>
                    <td className="py-3 px-6">{record.asunto}</td>
                    <td className="py-3 px-6">{record.estatus}</td>
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
                        onClick={() => handleDelete(record.folio)}
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {showEditModal && selectedRecord && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white rounded-lg w-full max-w-3xl p-6 shadow-xl relative">
                {/* Encabezado con animación */}
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-[#691B31]">
                    Editar Registro
                  </h2>
                  <div className="text-[#BC995B] text-3xl animate-spin">
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
                      alert("✅ Cambios guardados exitosamente");
                    } else {
                      alert("❌ Ha ocurrido un error");
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
                        Comunidad
                      </label>
                      <input
                        type="text"
                        className="input-field"
                        defaultValue={selectedRecord.comunidad}
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
                        Cargo Destinatario
                      </label>
                      <input
                        type="text"
                        className="input-field"
                        defaultValue={selectedRecord.cargoDestinatario}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-bold">
                        Área
                      </label>
                      <input
                        type="text"
                        className="input-field"
                        defaultValue={selectedRecord.area}
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
                    <div>
                      <label className="block text-gray-700 font-bold">
                        Status
                      </label>
                      <select className="input-field">
                        <option
                          value="Pendiente"
                          selected={selectedRecord.estatus === "Pendiente"}
                        >
                          Pendiente
                        </option>
                        <option
                          value="En proceso"
                          selected={selectedRecord.estatus === "En proceso"}
                        >
                          En proceso
                        </option>
                        <option
                          value="Finalizado"
                          selected={selectedRecord.estatus === "Finalizado"}
                        >
                          Finalizado
                        </option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-bold">
                        Importancia
                      </label>
                      <select className="input-field">
                        <option value="Alta">Alta</option>
                        <option value="Media">Media</option>
                        <option value="Baja">Baja</option>
                      </select>
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
