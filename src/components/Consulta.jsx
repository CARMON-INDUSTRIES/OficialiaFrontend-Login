"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FaSignOutAlt,
  FaHome,
  FaUserPlus,
  FaEye,
  FaEdit,
  FaTrashAlt,
  FaUsers,
} from "react-icons/fa";

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [records, setRecords] = useState([
    {
      folio: "001",
      date: "2025-01-01",
      department: "Recursos Humanos",
      subject: "Contratación",
      status: "Activo",
    },
    {
      folio: "002",
      date: "2025-01-02",
      department: "Finanzas",
      subject: "Presupuesto",
      status: "Pendiente",
    },
    {
      folio: "003",
      date: "2025-01-03",
      department: "Jurídico",
      subject: "Revisión de contrato",
      status: "Cerrado",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleDelete = (folio) => {
    setRecords(records.filter((record) => record.folio !== folio));
  };

  const handleView = (record) => {
    setSelectedRecord(record);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedRecord(null);
  };

  const filteredRecords = records.filter(
    (record) =>
      record.folio.includes(search) ||
      record.department.toLowerCase().includes(search.toLowerCase()) ||
      record.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-[#F5F5F5]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#691B31] text-white flex flex-col justify-between">
        <div>
          <div className="text-center p-6 border-b border-[#BC995B]">
            <h1 className="text-2xl font-bold">Unidad Central</h1>
            <h2 className="text-sm font-semibold">de Correspondencia</h2>
            <div className="flex justify-center items-center w-16 h-16 mx-auto">
              <FaUsers className="text-6xl text-slate-50" />
            </div>
          </div>
          <nav className="flex flex-col gap-4 px-6 mt-4">
            <Link
              href="/consulta"
              className="flex items-center gap-3 py-2 hover:text-[#BC995B]"
            >
              <FaHome /> Inicio
            </Link>
            <Link
              href="/register"
              className="flex items-center gap-3 py-2 hover:text-[#BC995B]"
            >
              <FaUserPlus /> Registro
            </Link>
          </nav>
        </div>
        <button
          onClick={() => (window.location.href = "/landingpage")}
          className="flex items-center gap-3 px-6 py-4 hover:text-[#BC995B]"
        >
          <FaSignOutAlt /> Cerrar Sesión
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Contenedor para título y barra de búsqueda */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Inicio</h1>
          <input
            type="text"
            placeholder="Buscar registros..."
            className="w-full max-w-md px-4 py-2 border border-[#691B31] rounded-lg focus:outline-none focus:border-[#BC995B]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
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
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() => handleView(record)}
                    >
                      <FaEye />
                    </button>
                    <button className="text-green-500 hover:underline">
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

        {/* Modal */}
        {showModal && selectedRecord && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-3xl">
              <h2 className="text-2xl font-bold mb-4">Detalles del Registro</h2>
              <form className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-2">Folio</label>
                  <input
                    type="text"
                    value={selectedRecord.folio}
                    readOnly
                    className="w-full px-4 py-2 border border-[#691B31] rounded-lg focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Fecha</label>
                  <input
                    type="text"
                    value={selectedRecord.date}
                    readOnly
                    className="w-full px-4 py-2 border border-[#691B31] rounded-lg focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Dependencia</label>
                  <input
                    type="text"
                    value={selectedRecord.department}
                    readOnly
                    className="w-full px-4 py-2 border border-[#691B31] rounded-lg focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Fecha emisión</label>
                  <input
                    type="text"
                    value={selectedRecord.subject}
                    readOnly
                    className="w-full px-4 py-2 border border-[#691B31] rounded-lg focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Asunto</label>
                  <input
                    type="text"
                    value={selectedRecord.subject}
                    readOnly
                    className="w-full px-4 py-2 border border-[#691B31] rounded-lg focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Remitente</label>
                  <input
                    type="text"
                    value={selectedRecord.subject}
                    readOnly
                    className="w-full px-4 py-2 border border-[#691B31] rounded-lg focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Solicitante</label>
                  <input
                    type="text"
                    value={selectedRecord.subject}
                    readOnly
                    className="w-full px-4 py-2 border border-[#691B31] rounded-lg focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Documento</label>
                  <input
                    type="text"
                    value={selectedRecord.subject}
                    readOnly
                    className="w-full px-4 py-2 border border-[#691B31] rounded-lg focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Areas destino</label>
                  <input
                    type="text"
                    value={selectedRecord.subject}
                    readOnly
                    className="w-full px-4 py-2 border border-[#691B31] rounded-lg focus:outline-none"
                  />
                </div>
              </form>
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
        )}
      </main>
    </div>
  );
};

export default Dashboard;
