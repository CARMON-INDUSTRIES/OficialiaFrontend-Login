"use client";
import React, { useState, useEffect } from "react";
import {
  FaEdit,
  FaCheckCircle,
  FaSearch,
  FaPlus,
  FaTrash,
} from "react-icons/fa"; // Añadimos FaSearch
import Image from "next/image";
import { useRouter } from "next/navigation";
import RegisterModal from "../components/RegisterModal"; // Asegúrate de que la ruta sea correcta
import axios from "axios";
import Swal from "sweetalert2";

const fondoModal = "/images/fondoModal.jpg";
const fondoRoles = "/images/roles.jpg";

const Roles = () => {
  const router = useRouter();
  const [usuarios, setUsuarios] = useState([]);

  const [filteredUsuarios, setFilteredUsuarios] = useState([]);
  // Estado para los usuarios filtrados
  const [modalOpen, setModalOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState("");
  const { newUser, setNewUser } = useState({
    area: "",
    correo: "",
    rol: "Usuario",
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false); // Estado para el mensaje de error
  const [searchTerm, setSearchTerm] = useState(""); // Estado para la búsqueda
  const [rotateOnLoad, setRotateOnLoad] = useState(false); // Estado para controlar la animación en el
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    setRotateOnLoad(true);
    setTimeout(() => setRotateOnLoad(false), 1000);
  }, []);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(
          "https://oficialialoginbackend.somee.com/api/Roles/GetRoles"
        );
        setRoles(response.data); // Guarda los roles en el estado
      } catch (error) {
        console.error("Error al cargar los roles:", error);
      }
    };

    fetchRoles();
  }, []); // Esto se ejecutará solo una vez cuando el componente se monte

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get(
        "https://oficialialoginbackend.somee.com/api/Roles/GetUsersWithRoles"
      );
      const usuariosConArea = await Promise.all(
        response.data.map(async (user) => {
          try {
            console.log(`Consultando área para usuario: ${user.id}`);
            const areaResponse = await axios.get(
              `https://oficialialoginbackend.somee.com/api/UsuarioArea/GetAreaByUser/${user.id}`
            );

            console.log(
              `Respuesta de API de área para ${user.id}:`,
              areaResponse.data
            );

            return {
              ...user,
              nombreArea: areaResponse.data?.area || "No asignada",
            };
          } catch (error) {
            console.error(
              `Error al obtener área para usuario ${user.id}:`,
              error
            );
            return { ...user, nombreArea: "No asignada" };
          }
        })
      );
      setUsuarios(usuariosConArea);
      setFilteredUsuarios(usuariosConArea);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      // Mostrar SweetAlert de confirmación antes de eliminar
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "¡Este usuario será eliminado permanentemente!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, eliminarlo",
      });

      // Si el usuario confirma la eliminación
      if (result.isConfirmed) {
        // Realizar la solicitud de eliminación
        await axios.delete(
          `https://oficialialoginbackend.somee.com/api/Cuentas/EliminarUsuario/${userId}`
        );

        // Eliminar el usuario de los estados
        setUsuarios(usuarios.filter((user) => user.id !== userId));
        setFilteredUsuarios(
          filteredUsuarios.filter((user) => user.id !== userId)
        );

        // Mostrar SweetAlert de éxito
        Swal.fire({
          title: "¡Usuario Eliminado!",
          text: "El usuario ha sido eliminado correctamente.",
          icon: "success",
          confirmButtonColor: "#691B31",
          confirmButtonText: "Aceptar",
        });
      }
    } catch (error) {
      console.error("Error al eliminar usuario:", error);

      // Mostrar SweetAlert de error si ocurre un problema
      Swal.fire({
        title: "¡Error!",
        text: "Ha ocurrido un error al eliminar el usuario. Intenta nuevamente.",
        icon: "error",
        confirmButtonColor: "#691B31",
        confirmButtonText: "Cerrar",
      });
    }
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setNewRole(user.roles[0]);
    setModalOpen(true);
  };

  const openAddUserModal = () => setAddUserModalOpen(true);
  const closeAddUserModal = () => {
    setAddUserModalOpen(false);
    setNewUser({ userName: "", email: "", rol: "Usuario", password: "" });
  };

  const saveNewUser = () => {
    setUsuarios([...usuarios, { ...newUser, id: usuarios.length + 1 }]);
    setFilteredUsuarios([...usuarios, { ...newUser, id: usuarios.length + 1 }]);
    closeAddUserModal();
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedUser(null);
  };

  const saveChanges = async () => {
    if (!selectedUser) return;
    try {
      const response = await axios.post(
        "https://oficialialoginbackend.somee.com/api/Roles/AsignarRol",
        {
          id: selectedUser.id,
          Email: selectedUser.email,
          Role: newRole,
        }
      );

      if (response.status === 200) {
        setUsuarios((prevUsers) =>
          prevUsers.map((user) =>
            user.id === selectedUser.id ? { ...user, roles: newRole } : user
          )
        );
        setFilteredUsuarios((prevUsers) =>
          prevUsers.map((user) =>
            user.id === selectedUser.id ? { ...user, roles: newRole } : user
          )
        );
        setShowConfirmation(true);
        setTimeout(() => setShowConfirmation(false), 2000);
      }
    } catch (error) {
      console.error("Error al actualizar el rol:", error);
      setShowErrorMessage(true);
      setTimeout(() => setShowErrorMessage(false), 2000);
    }
    closeModal();
  };

  const quitarRol = async (usuarioEmail, rolAEliminar) => {
    try {
      const response = await axios.post(
        "https://oficialialoginbackend.somee.com/api/Roles/QuitarRol",
        {
          email: usuarioEmail,
          role: rolAEliminar,
        }
      );
      console.log("Rol eliminado correctamente:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Error al eliminar rol:",
        error.response?.data || error.message
      );
    }
  };

  // Función de filtro
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const filtered = usuarios.filter(
      (user) =>
        user.userName.toLowerCase().includes(value.toLowerCase()) ||
        user.nombreArea.toLowerCase().includes(value.toLowerCase()) ||
        (user.roles[0] &&
          user.roles[0].toLowerCase().includes(value.toLowerCase()))
    );
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
              className={`p-2 bg-[#621132] text-white rounded-full hover:bg-blue-600 transition ${
                rotateOnLoad ? "animate-rotate" : ""
              }`}
            >
              <FaSearch />
            </button>{" "}
            USUARIOS
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

        <div className="overflow-y-auto max-h-[500px] mt-6 border rounded-lg">
          <table className="w-full border-collapse bg-white">
            <thead className="bg-white sticky top-0 z-10">
              <tr className="text-gray-700">
                <th className="py-3 px-6 text-left text-lg">
                  Nombre de usuario
                </th>
                <th className="py-3 px-6 text-left text-lg">Area</th>
                <th className="py-3 px-6 text-left text-lg">Correo</th>
                <th className="py-3 px-6 text-left text-lg">Rol</th>
                <th className="py-3 px-6 text-left text-lg">Acción</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsuarios.map((user) => (
                <tr key={user.id} className="border-b border-gray-300">
                  <td className="px-4 py-2 text-gray-700 text-lg">
                    {user.userName}
                  </td>
                  <td className="px-4 py-2 text-gray-700 text-lg">
                    {user.nombreArea}
                  </td>
                  <td className="px-4 py-2 text-gray-700 text-lg">
                    {user.email}
                  </td>
                  <td className="px-4 py-2 text-gray-700 text-lg">
                    {user.roles[0]}
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex space-x-2">
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded flex items-center gap-2 hover:underline transition duration-200 transform hover:scale-105 focus:ring-2"
                        onClick={() => openModal(user)}
                      >
                        <FaEdit />
                      </button>

                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded flex items-center gap-2 hover:underline transition duration-200 transform hover:scale-105 focus:ring-2"
                        onClick={() => deleteUser(user.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🔹 Botón flotante para agregar usuario */}
      <button
        onClick={() => setIsRegisterOpen(true)}
        className="fixed bottom-6 right-6 bg-[#621132] text-white p-4 rounded-full shadow-lg hover:bg-[#891b45] transition transform hover:scale-110"
      >
        <FaPlus className="text-2xl" />
      </button>

      {/* Modal de Registro */}
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 transition-opacity duration-300 z-[50]">
          <div className="bg-white rounded-2xl shadow-2xl w-[500px] transform transition-all scale-105 z-[50]">
            <Image
              src={fondoModal}
              alt="Fondo Modal"
              width={500}
              height={120}
              className="rounded-t-2xl w-full h-28 object-cover"
            />

            <div className="p-6">
              <h2 className="text-2xl font-serif font-bold text-[#621132] text-center">
                EDITAR ROL
              </h2>
              <p className="text-gray-700 text-lg mt-2">
                <strong>Nombre de usuario:</strong> {selectedUser?.userName}
              </p>
              <p className="text-gray-700 text-lg mt-1">
                <strong>Correo:</strong> {selectedUser?.email}
              </p>

              <div className="mt-6">
                <label className="block font-semibold text-lg mb-2">
                  Cambiar rol:
                </label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full p-2 border rounded-lg border-[#691B31] focus:outline-none focus:ring-2 focus:ring-[#691B31] transition-all"
                >
                  {roles.map((role) => (
                    <option key={role.id} value={role.name}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                {/* Mostrar el botón para quitar rol solo si el usuario tiene el rol Admin o SuperAdmin */}
                {selectedUser?.roles.includes("Admin") && (
                  <button
                    className="bg-yellow-500 text-white px-2 py-2 rounded-lg hover:bg-yellow-600 transition duration-200 transform hover:scale-105 focus:ring-2 focus:ring-yellow-600"
                    onClick={() => quitarRol(selectedUser.email, "Admin")}
                  >
                    Quitar Admin
                  </button>
                )}

                {selectedUser?.roles.includes("SuperAdmin") && (
                  <button
                    className="bg-orange-500 text-white px-2 py-2 rounded-lg hover:bg-orange-600 transition duration-200 transform hover:scale-105 focus:ring-2 focus:ring-orange-600"
                    onClick={() => quitarRol(selectedUser.email, "SuperAdmin")}
                  >
                    Quitar SuperAdmin
                  </button>
                )}

               
                <button
                  className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition duration-200 transform hover:scale-105 focus:ring-2 focus:ring-green-500"
                  onClick={saveChanges}
                >
                  Guardar Cambios
                </button>
                <button
                  className="bg-red-400 text-white px-5 py-2 rounded-lg hover:bg-red-500 transition duration-200 transform hover:scale-105 focus:ring-2 focus:ring-red-500"
                  onClick={closeModal}
                >
                  Cancelar
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
