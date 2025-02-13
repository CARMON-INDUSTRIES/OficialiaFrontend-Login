"use client";
import React, { useState, useEffect } from "react";
import { FaEdit, FaCheckCircle, FaSearch } from "react-icons/fa"; // Añadimos FaSearch
import Image from "next/image";

const fondoModal = "/images/fondoModal.jpg";
const fondoRoles = "/images/roles.jpg";

const usuariosIniciales = [
  { id: 1, area: "Presidencia", correo: "Presidencia@example.com", rol: "Administrador" },
  { id: 2, area: "PROFECO", correo: "PROFECO@example.com", rol: "Editor" },
  { id: 3, area: "DIF", correo: "DIF@example.com", rol: "Usuario" },
];

const Roles = () => {
  const [usuarios, setUsuarios] = useState(usuariosIniciales);
  const [filteredUsuarios, setFilteredUsuarios] = useState(usuariosIniciales); // Estado para los usuarios filtrados
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false); // Estado para el mensaje de error
  const [searchTerm, setSearchTerm] = useState(""); // Estado para la búsqueda
  const [rotateOnLoad, setRotateOnLoad] = useState(false); // Estado para controlar la animación en el montaje

  useEffect(() => {
    setRotateOnLoad(true);
    setTimeout(() => setRotateOnLoad(false), 1000);
  }, []);

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
    const isSuccess = Math.random() > 0.5; // Aleatorio, puedes simularlo con tu lógica

    if (isSuccess) {
      setUsuarios((prevUsers) =>
        prevUsers.map((user) =>
          user.id === selectedUser.id ? { ...user, rol: newRole } : user
        )
      );
      setModalOpen(false);
      setShowConfirmation(true);
      setShowErrorMessage(false);
      setTimeout(() => setShowConfirmation(false), 2000);
    } else {
      setShowErrorMessage(true);
      setModalOpen(false);
      setTimeout(() => setShowErrorMessage(false), 2000);
    }
  };

  // Función de filtro
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const filtered = usuarios.filter((user) => {
      return (
        user.area.toLowerCase().includes(value.toLowerCase()) ||
        user.rol.toLowerCase().includes(value.toLowerCase())
      );
    });
    setFilteredUsuarios(filtered);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative p-6 bg-cover bg-center"
      style={{ backgroundImage: `url(${fondoRoles})` }}
    >
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-4">
        <div className="flex items-center justify-between gap-4 mb-4">
          <h1 className="text-4xl font-bold text-[#621132]">
          <button
              onClick={() => setSearching(true)}
              className={`p-2 bg-[#621132] text-white rounded-full hover:bg-blue-600 transition ${rotateOnLoad ? "animate-rotate" : ""}`}
            >
              <FaSearch />
            </button> USUARIOS
          
            </h1>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Buscar por área o rol"
              className="p-2 border border-[#621132] rounded-md focus:outline-none"
            />
           
          </div>
        </div>

        <div className="overflow-auto max-h-[500px] mt-6">
          <table className="w-full border-collapse bg-white">
            <thead>
              <tr className="text-gray-700">
                <th className="py-3 px-6 text-left text-lg">Area</th>
                <th className="py-3 px-6 text-left text-lg">Correo</th>
                <th className="py-3 px-6 text-left text-lg">Rol</th>
                <th className="py-3 px-6 text-left text-lg">Acción</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsuarios.map((user) => (
                <tr key={user.id} className="border-b border-gray-300">
                  <td className="px-4 py-2 text-gray-700 text-lg">{user.area}</td>
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
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 transition-opacity duration-300">
    <div className="bg-white rounded-2xl shadow-2xl w-[500px] transform transition-all scale-105">
      <Image
        src={fondoModal}
        alt="Fondo Modal"
        width={500}
        height={120}
        className="rounded-t-2xl w-full h-28 object-cover"
      />

      <div className="p-6">
        <h2 className="text-2xl font-serif font-bold text-[#621132] text-center">EDITAR ROL</h2>
        <p className="text-gray-700 text-lg mt-2">
          <strong>Area:</strong> {selectedUser?.area}
        </p>
        <p className="text-gray-700 text-lg mt-1">
          <strong>Correo:</strong> {selectedUser?.correo}
        </p>

        <div className="mt-6">
          <label className="block font-semibold text-lg mb-2">Selecciona un nuevo rol:</label>
          <select
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            className="w-full p-2 border rounded-lg border-[#691B31] focus:outline-none focus:ring-2 focus:ring-[#691B31] transition-all"
          >
            <option value="Usuario">Usuario</option>
            <option value="Administrador">Administrador</option>
          </select>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            className="bg-red-400 text-white px-5 py-2 rounded-lg hover:bg-red-500 transition duration-200 transform hover:scale-105 focus:ring-2 focus:ring-red-500"
            onClick={closeModal}
          >
            Cancelar
          </button>
          <button
            className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition duration-200 transform hover:scale-105 focus:ring-2 focus:ring-green-500"
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

      {/* Pantalla de error */}
      {showErrorMessage && (
        <div className="fixed top-20 right-5 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-slideIn">
          <span className="text-lg">Ha ocurrido un error...</span>
        </div>
      )}

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

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-rotate {
          animation: rotate 1s linear;
        }
      `}</style>
    </div>
  );
};

export default Roles;
