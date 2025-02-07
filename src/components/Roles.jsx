"use client";
import React from "react";
import { FaUser, FaEnvelope, FaUserShield, FaEdit } from "react-icons/fa";

const usuarios = [
  { id: 1, nombre: "Juan Pérez", correo: "juan@example.com", rol: "Administrador" },
  { id: 2, nombre: "María López", correo: "maria@example.com", rol: "Editor" },
  { id: 3, nombre: "Carlos Sánchez", correo: "carlos@example.com", rol: "Usuario" },
];

const Roles = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-600 p-6">
      <div className="w-full max-w-4xl bg-transparent shadow-lg rounded-lg p-4">
        <h1 className="text-4xl font-bold text-gray-700 text-center mb-4">USUARIOS</h1>
        <div className="overflow-auto max-h-[500px] mt-6">
        
          <table className="min-w-full border-collapse bg-transparent">
            <thead>
              <tr className="text-gray-700">
                <th className="py-3 px-6 text-left"> Nombre</th>
                <th className="py-3 px-6 text-left"> Correo</th>
                <th className="py-3 px-6 text-left"> Rol</th>
                <th className="py-3 px-6 text-left">Acción</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((user) => (
                <tr key={user.id} className="border-b border-gray-300">
                  <td className="px-4 py-2 text-gray-700">{user.nombre}</td>
                  <td className="px-4 py-2 text-gray-700">{user.correo}</td>
                  <td className="px-4 py-2 text-gray-700">{user.rol}</td>
                  <td className="px-4 py-2">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded flex items-center gap-2 hover:bg-blue-600 transition">
                      <FaEdit /> Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Roles;