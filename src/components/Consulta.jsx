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
      const response = await axios.get("https://oficialialoginbackend.somee.com/api/Correspondencia/obtener", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRecords(response.data);
    } catch (error) {
      console.error("Error al obtener registros:", error);
    }
  };

  const handleDelete = async (folio) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://oficialialoginbackend.somee.com/api/Correspondencia/obtener${folio}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
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
    setEditData(record);
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
                      <button className="text-blue-500 hover:underline" onClick={() => handleView(record)}>
                        <FaEye />
                      </button>
                      <button className="text-green-500 hover:underline" onClick={() => handleEdit(record)}>
                        <FaEdit />
                      </button>
                      <button className="text-red-500 hover:underline" onClick={() => handleDelete(record.folio)}>
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {showModal && selectedRecord && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white rounded-lg w-full max-w-3xl flex overflow-hidden min-h-[400px]">
                <div className="w-1/3">
                  <img
                    src="/images/consulta.jpeg"
                    alt="Registro"
                    className="w-full h-full object-cover rounded-l-lg"
                  />
                </div>
                <div className="w-2/3 p-6 flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-4 text-[#691B31]">Detalles del Registro</h2>
                    <p className="text-lg mb-2"><span className="font-bold">Folio:</span> {selectedRecord.folio}</p>
                    <p className="text-lg mb-2"><span className="font-bold">Fecha:</span> {selectedRecord.fecha}</p>
                    <p className="text-lg mb-2"><span className="font-bold">Destinatario:</span> {selectedRecord.dependencia}</p>
                    <p className="text-lg mb-2"><span className="font-bold">Asunto:</span> {selectedRecord.asunto}</p>
                    <p className="text-lg mb-2"><span className="font-bold">Status:</span> {selectedRecord.estatus}</p>
                    <p className="text-lg mb-2"><span className="font-bold">Remitente:</span> {selectedRecord.remitente}</p>
                    <p className="text-lg mb-2"><span className="font-bold">Cargo Remitente:</span> {selectedRecord.cargoRemitente}</p>
                    <p className="text-lg mb-2"><span className="font-bold">Destinatario:</span> {selectedRecord.destinatario}</p>
                    <p className="text-lg mb-2"><span className="font-bold">Cargo Destinatario:</span> {selectedRecord.cargoDestinatario}</p>
                    <p className="text-lg mb-2"><span className="font-bold">Area:</span> {selectedRecord.area}</p>
                  </div>
                  <div className="flex justify-end">
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
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white rounded-lg w-full max-w-3xl p-6 shadow-xl">
      <h2 className="text-2xl font-bold mb-4 text-[#691B31]">Editar Registro</h2>
      <form>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-bold">Folio</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#BC995B]"
              value={selectedRecord.folio}
              readOnly
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Fecha</label>
            <input
              type="date"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#BC995B]"
              value={selectedRecord.fecha}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Dependencia</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#BC995B]"
              value={selectedRecord.dependencia}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Asunto</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#BC995B]"
              value={selectedRecord.asunto}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Status</label>
            <select className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#BC995B]">
              <option value="Pendiente">Pendiente</option>
              <option value="En proceso">En proceso</option>
              <option value="Finalizado">Finalizado</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            type="button"
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 mr-2"
            onClick={() => setShowEditModal(false)}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-[#BC995B] text-white rounded-lg hover:bg-[#A87F50]"
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  </div>
)}

        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

