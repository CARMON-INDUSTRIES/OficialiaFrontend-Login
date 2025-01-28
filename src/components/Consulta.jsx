"use client";

import React, { useState } from "react";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import Layout from "@/components/Layout";

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [records, setRecords] = useState([
    { folio: "001", date: "2025-01-01", department: "Recursos Humanos", subject: "Contratación", status: "Activo" },
    { folio: "002", date: "2025-01-02", department: "Finanzas", subject: "Presupuesto", status: "Pendiente" },
    { folio: "003", date: "2025-01-03", department: "Jurídico", subject: "Revisión de contrato", status: "Cerrado" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleDelete = (folio) => setRecords(records.filter((record) => record.folio !== folio));
  const handleView = (record) => {
    setSelectedRecord(record);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setSelectedRecord(null);
  };

  const filteredRecords = records.filter((record) =>
    record.folio.includes(search) ||
    record.department.toLowerCase().includes(search.toLowerCase()) ||
    record.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div className="flex flex-col p-6">
        <h1 className="text-3xl font-bold mb-4">Inicio</h1>
        <input
          type="text"
          placeholder="Buscar registros..."
          className="w-full max-w-md px-4 py-2 border border-[#691B31] rounded-lg focus:outline-none focus:border-[#BC995B]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Tabla */}
        <div className="overflow-x-auto mt-6">
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
              {filteredRecords.map((record) => (
                <tr key={record.folio} className="border-b">
                  <td className="py-3 px-6">{record.folio}</td>
                  <td className="py-3 px-6">{record.date}</td>
                  <td className="py-3 px-6">{record.department}</td>
                  <td className="py-3 px-6">{record.subject}</td>
                  <td className="py-3 px-6">{record.status}</td>
                  <td className="py-3 px-6 flex justify-center gap-4">
                    <button className="text-blue-500 hover:underline" onClick={() => handleView(record)}>
                      <FaEye />
                    </button>
                    <button className="text-green-500 hover:underline"><FaEdit /></button>
                    <button className="text-red-500 hover:underline" onClick={() => handleDelete(record.folio)}>
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {showModal && selectedRecord && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            
            <div className="bg-white rounded-lg p-6 w-full max-w-3xl flex">
              {/* Imagen a la izquierda */}
              
              <div className="w-1/2 flex items-center justify-center">
                <img
                  src="/images/consulta.jpeg" // Asegúrate de tener una imagen en esta ruta
                  alt="Registro"
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>
              {/* Información a la derecha */}
              <div className="w-2/3 p-6">
                <h2 className="text-2xl font-bold mb-4 text-[#691B31]">Detalles del Registro</h2>
                <p className="text-lg mb-2">
                  <span className="font-bold">Folio:</span> {selectedRecord.folio}
                </p>
                <p className="text-lg mb-2">
                  <span className="font-bold">Fecha:</span> {selectedRecord.date}
                </p>
                <p className="text-lg mb-2">
                  <span className="font-bold">Dependencia:</span> {selectedRecord.department}
                </p>
                <p className="text-lg mb-2">
                  <span className="font-bold">Asunto:</span> {selectedRecord.subject}
                </p>
                <p className="text-lg mb-4">
                  <span className="font-bold">Status:</span> {selectedRecord.status}
                </p>
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
      </div>
    </Layout>
  );
};

export default Dashboard;

