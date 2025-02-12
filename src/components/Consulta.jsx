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
  const [editedRecord, setEditedRecord] = useState(null);

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
    setEditedRecord(record);
    setShowEditModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedRecord(null);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditedRecord(null);
  };

  const handleInputChange = (e) => {
    setEditedRecord({
      ...editedRecord,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`https://oficialialoginbackend.somee.com/api/Correspondencia/editar/${editedRecord.folio}`, editedRecord, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRecords(records.map(record => record.folio === editedRecord.folio ? editedRecord : record));
      closeEditModal();
    } catch (error) {
      console.error("Error al actualizar:", error);
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

          {showEditModal && editedRecord && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white rounded-lg w-full max-w-3xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-[#691B31] mb-4">Editar Registro</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold">Folio</label>
                    <input type="text" value={editedRecord.folio} disabled className="w-full px-4 py-2 border rounded-lg bg-gray-200" />
                  </div>
                  <div>
                    <label className="block font-semibold">Fecha</label>
                    <input type="date" name="fecha" value={editedRecord.fecha} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:border-[#BC995B]" />
                  </div>
                  <div>
                    <label className="block font-semibold">Dependencia</label>
                    <input type="text" name="dependencia" value={editedRecord.dependencia} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:border-[#BC995B]" />
                  </div>
                  <div>
                    <label className="block font-semibold">Asunto</label>
                    <input type="text" name="asunto" value={editedRecord.asunto} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:border-[#BC995B]" />
                  </div>
                  <div>
                    <label className="block font-semibold">Status</label>
                    <input type="text" name="estatus" value={editedRecord.estatus} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:border-[#BC995B]" />
                  </div>
                </div>
                <div className="flex justify-end gap-4 mt-6">
                  <button onClick={closeEditModal} className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500">
                    Cancelar
                  </button>
                  <button onClick={handleSave} className="px-4 py-2 bg-[#BC995B] text-white rounded-lg hover:bg-[#A87F50]">
                    Guardar Cambios
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
