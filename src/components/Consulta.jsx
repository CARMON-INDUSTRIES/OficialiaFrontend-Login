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
    { folio: "001", date: "2025-01-01", department: "Recursos Humanos", subject: "Contratación", status: "Activo" },
    { folio: "002", date: "2025-01-02", department: "Finanzas", subject: "Presupuesto", status: "Pendiente" },
    { folio: "003", date: "2025-01-03", department: "Jurídico", subject: "Revisión de contrato", status: "Cerrado" },
  ]);

  const handleDelete = (folio) => {
    setRecords(records.filter((record) => record.folio !== folio));
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
          {/* Mover título aquí */}
          <div className="text-center p-6 border-b border-[#BC995B]">
            <h1 className="text-2xl font-bold">Unidad Central</h1>
            <h2 className="text-sm font-semibold">de Correspondencia</h2>
            <div className="flex justify-center items-center w-16 h-16 mx-auto">
  <FaUsers className="text-6xl text-slate-50" />
</div>




          </div>
          <nav className="flex flex-col gap-4 px-6 mt-4">
          
            <Link href="/" className="flex items-center gap-3 py-2 hover:text-[#BC995B]">
              <FaHome /> Inicio
            </Link>
            <Link href="/register" className="flex items-center gap-3 py-2 hover:text-[#BC995B]">
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
        <h1 className="text-3xl font-bold mb-6">Inicio</h1>

        {/* Search Bar */}
        <div className="flex items-center justify-between mb-6">
          <input
            type="text"
            placeholder="Buscar registros..."
            className="w-full max-w-md px-4 py-2 border rounded-lg"
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
                    <button className="text-blue-500 hover:underline">
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
      </main>
    </div>
  );
};

export default Dashboard;
