"use client";
import React, { useState } from "react";
import { FaEdit, FaCheckCircle } from "react-icons/fa";
import Image from "next/image";

const fondoModal = "/images/fondoModal.jpg";

const usuariosIniciales = [
  { id: 1, nombre: "Juan Pérez", correo: "juan@example.com", rol: "Administrador" },
  { id: 2, nombre: "María López", correo: "maria@example.com", rol: "Editor" },
  { id: 3, nombre: "Carlos Sánchez", correo: "carlos@example.com", rol: "Usuario" },
];

const Roles = () => {
  const [usuarios, setUsuarios] = useState(usuariosIniciales);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const openModal = (user) => {
    setSelectedUser(user);
    setNewRole(user.rol);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedUser(null);
  };

  const saveChanges = () => {
    setUsuarios((prevUsers) =>
      prevUsers.map((user) =>
        user.id === selectedUser.id ? { ...user, rol: newRole } : user
      )
    );
    setModalOpen(false);
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-[#621132] p-6">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-4">
        <h1 className="text-4xl font-bold text-[#621132] text-center mb-4">USUARIOS</h1>
        <div className="overflow-auto max-h-[500px] mt-6">
          <table className="w-full border-collapse bg-white">
            <thead>
              <tr className="text-gray-700">
                <th className="py-3 px-6 text-left text-lg">Nombre</th>
                <th className="py-3 px-6 text-left text-lg">Correo</th>
                <th className="py-3 px-6 text-left text-lg">Rol</th>
                <th className="py-3 px-6 text-left text-lg">Acción</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((user) => (
                <tr key={user.id} className="border-b border-gray-300">
                  <td className="px-4 py-2 text-gray-700 text-lg">{user.nombre}</td>
                  <td className="px-4 py-2 text-gray-700 text-lg">{user.correo}</td>
                  <td className="px-4 py-2 text-gray-700 text-lg">{user.rol}</td>
                  <td className="px-4 py-2">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded flex items-center gap-2 hover:bg-blue-600 transition"
                      onClick={() => openModal(user)}
                    >
                      <FaEdit /> Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-[500px]">
            <Image src={fondoModal} alt="Fondo Modal" width={500} height={120} className="rounded-t-lg w-full h-28 object-cover" />

            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-700 text-center">EDITAR ROL</h2>

              <div className="bg-gray-100 p-4 rounded-lg mt-4">
                <p className="text-gray-600 text-lg"><strong>Nombre:</strong> {selectedUser?.nombre}</p>
                <p className="text-gray-600 text-lg"><strong>Correo:</strong> {selectedUser?.correo}</p>
              </div>

              {/* Dropdown de selección de rol */}
              <div className="mt-4">
                <label className="block text-gray-600 text-lg mb-2">Selecciona un nuevo rol:</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                >
                  <option value="Usuario">Usuario</option>
                  <option value="Administrador">Administrador</option>
                </select>
              </div>

              {/* Botones */}
              <div className="flex justify-end gap-2 mt-6">
                <button
                  className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-500 transition text-lg"
                  onClick={closeModal}
                >
                  Cancelar
                </button>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition text-lg"
                  onClick={saveChanges}
                >
                  Guardar Cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pantalla de confirmación */}
      {showConfirmation && (
        <div className="fixed top-20 right-5 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-slideIn">
          <FaCheckCircle className="text-white text-2xl" />
          <span className="text-lg">Cambios guardados correctamente</span>
        </div>
      )}

      {/* Animación para la pantalla de confirmación */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slideIn {
          animation: slideIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Roles;
