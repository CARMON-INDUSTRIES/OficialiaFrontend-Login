"use client";
import React, { useState, useEffect } from "react";
import {
  FaEdit,
  FaCheckCircle,
  FaSearch,
  FaPlus,
  FaTrash,
} from "react-icons/fa"; // Añadimos FaSearch
import { OficioDialog, OficioSection } from "./OficioDialog";
import { fieldClass } from "./OficioFields";
import { useRouter } from "next/navigation";
import RegisterModal from "../components/RegisterModal"; // Asegúrate de que la ruta sea correcta
import axios from "axios";
import Swal from "sweetalert2";

const api = "https://oficialialoginbackend.somee.com/api";
const roleLabels = { Admin: "Administrador", SuperAdmin: "Superadministrador", User: "Usuario" };

const Roles = () => {
  const router = useRouter();
  const [usuarios, setUsuarios] = useState([]);
  // Estado para los usuarios filtrados
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editUser, setEditUser] = useState({ correo: "", areaId: "", rol: "" });
  const [areas, setAreas] = useState([]);
  const [areaLoadError, setAreaLoadError] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editError, setEditError] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
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
            
            const areaResponse = await axios.get(
              `https://oficialialoginbackend.somee.com/api/UsuarioArea/GetAreaByUser/${user.id}`
            );


            return {
              ...user,
              nombreArea: areaResponse.data?.area || "No asignada",
              areaId: areaResponse.data?.areaId,
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
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  useEffect(() => {
    fetchUsuarios(); // Llamar la primera vez cuando el componente se monta

    // Configurar el intervalo para ejecutar cada 60 segundos
    const interval = setInterval(() => {
      fetchUsuarios();
    }, 60000); // 60,000 ms = 60 segundos

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(interval);
  }, []); // Se ejecuta solo una vez cuando el componente se monta

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

      if (result.isConfirmed) {
        // Realizar la solicitud de eliminación
        await axios.delete(
          `https://oficialialoginbackend.somee.com/api/Cuentas/EliminarUsuario/${userId}`
        );

        // Eliminar el usuario de los estados
        setUsuarios(usuarios.filter((user) => user.id !== userId));

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

  const openModal = async (user) => {
    setSelectedUser(user);
    setEditUser({ correo: user.email ?? "", areaId: user.areaId ?? "", rol: "" });
    setEditError("");
    setAreaLoadError(false);
    try {
      const { data } = await axios.get(api + "/Correspondencia/obtener-areas");
      setAreas(data);
    } catch {
      setAreaLoadError(true);
    }
  };

  const closeModal = () => {
    if (!saving) setSelectedUser(null);
  };

  const saveChanges = async (event) => {
    event.preventDefault();
    if (!selectedUser || saving) return;

    const changes = {};
    const correo = editUser.correo.trim();
    if (correo !== (selectedUser.email ?? "")) {
      if (!correo) {
        setEditError("Ingresa un correo electrónico.");
        return;
      }
      changes.correo = correo;
    }
    if (editUser.areaId && Number(editUser.areaId) !== selectedUser.areaId) {
      changes.areaId = Number(editUser.areaId);
    }
    if (editUser.rol) changes.rol = editUser.rol;
    if (!Object.keys(changes).length) {
      closeModal();
      return;
    }

    setSaving(true);
    setEditError("");
    try {
      const token = localStorage.getItem("token");
      await axios.put(api + "/Roles/usuarios/" + encodeURIComponent(selectedUser.id), changes, {
        headers: { Authorization: "Bearer " + token },
      });
      setUsuarios((previous) => previous.map((user) => user.id === selectedUser.id ? {
        ...user,
        email: changes.correo ?? user.email,
        roles: changes.rol ? [changes.rol] : user.roles,
        areaId: changes.areaId ?? user.areaId,
        nombreArea: areas.find((area) => area.idArea === changes.areaId)?.nombreArea ?? user.nombreArea,
      } : user));
      setSelectedUser(null);
      fetchUsuarios();
      setShowConfirmation(true);
      setTimeout(() => setShowConfirmation(false), 2000);
    } catch (error) {
      const code = error.response?.status;
      setEditError(code === 401 || code === 403
        ? "Tu sesión venció o no tienes permiso para editar usuarios."
        : error.response?.data?.mensaje || "No se pudieron guardar los cambios. Inténtalo de nuevo.");
    } finally {
      setSaving(false);
    }
  };

  const query = searchTerm.trim().toLowerCase();
  const filteredUsuarios = usuarios.filter((user) =>
    [user.userName, user.email, user.nombreArea, ...user.roles, ...user.roles.map((role) => roleLabels[role])].some(
      (value) => value?.toLowerCase().includes(query)
    )
  );

  return (
    <div
      className="municipal-page"
    >
      <div className="municipal-panel">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <h1 className="municipal-title">
            <button
              onClick={() => setSearching(true)}
              className={`p-2 bg-[#621132] text-white rounded-full hover:bg-blue-600 transition ${
                rotateOnLoad ? "animate-rotate" : ""
              }`}
            >
              <FaSearch />
            </button>{" "}
            Roles y usuarios
          </h1>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Buscar por área o rol"
              className="p-2 border border-[#621132] rounded-md focus:outline-none"
            />
          </div>
        </div>

        <div className="municipal-table" tabIndex={0} aria-label="Usuarios y roles">
          <table className="w-full border-collapse bg-white">
            <thead className="bg-white sticky top-0 z-10">
              <tr className="text-gray-700">
                <th className="py-3 px-6 text-left text-lg">Nombre</th>
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
                    {user.roles.map((role) => roleLabels[role] ?? role).join(", ")}
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex space-x-2">
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded flex items-center gap-2 hover:underline transition duration-200 transform hover:scale-105 focus:ring-2"
                        aria-label={"Editar a " + user.userName}
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
        className="fixed bottom-24 right-6 bg-[#621132] text-white p-4 rounded-full shadow-lg hover:bg-[#891b45] transition transform hover:scale-110"
      >
        <FaPlus className="text-2xl" />
      </button>

      {/* Modal de Registro */}
      <RegisterModal
        isOpen={isRegisterOpen}
        onUsersChanged={fetchUsuarios}
        onClose={() => setIsRegisterOpen(false)}
      />

      {selectedUser && (
        <OficioDialog title="Editar usuario" onClose={closeModal} actions={
          <>
            <button type="button" onClick={closeModal} disabled={saving} className="municipal-secondary">
              Cancelar
            </button>
            <button type="submit" form="editar-usuario" disabled={saving} className="municipal-primary disabled:opacity-60">
              {saving ? "Guardando…" : "Guardar cambios"}
            </button>
          </>
        }>
          <form id="editar-usuario" onSubmit={saveChanges}>
            <fieldset disabled={saving}>
              <OficioSection title="Datos de la cuenta">
                <div>
                  <p className="mb-1 font-semibold">Nombre de usuario</p>
                  <p className="break-words">{selectedUser.userName}</p>
                </div>
                <label className="grid min-w-0 gap-1 font-semibold">
                  Correo electrónico
                  <input type="email" autoComplete="email" maxLength={256} className={fieldClass + " font-normal"}
                    value={editUser.correo}
                    onChange={(event) => setEditUser({ ...editUser, correo: event.target.value })} />
                </label>
              </OficioSection>
              <OficioSection title="Área y permisos">
                <label className="grid min-w-0 content-start gap-1 font-semibold">
                  Área
                  <select value={editUser.areaId} className={fieldClass + " font-normal"} disabled={areaLoadError}
                    onChange={(event) => setEditUser({ ...editUser, areaId: event.target.value })}>
                    <option value="" disabled>{selectedUser.nombreArea}</option>
                    {selectedUser.areaId && !areas.some((area) => area.idArea === selectedUser.areaId) && (
                      <option value={selectedUser.areaId}>{selectedUser.nombreArea}</option>
                    )}
                    {areas.map((area) => <option key={area.idArea} value={area.idArea}>{area.nombreArea}</option>)}
                  </select>
                </label>
                <label className="grid min-w-0 content-start gap-1 font-semibold">
                  Rol
                  <select value={editUser.rol} className={fieldClass + " font-normal"}
                    onChange={(event) => setEditUser({ ...editUser, rol: event.target.value })}>
                    <option value="">Conservar {selectedUser.roles.map((role) => roleLabels[role] ?? role).join(", ") || "sin rol"}</option>
                    {roles.map((role) => <option key={role.id} value={role.name}>{roleLabels[role.name] ?? role.name}</option>)}
                  </select>
                  <span className="text-sm font-normal">Elegir otro rol reemplaza los roles anteriores.</span>
                </label>
                {areaLoadError && <p role="alert" className="text-sm text-red-800 sm:col-span-2">No se pudieron cargar las áreas.</p>}
              </OficioSection>
            </fieldset>
            {editError && <p role="alert" className="pb-4 text-red-800">{editError}</p>}
          </form>
        </OficioDialog>
      )}

      {/* Pantalla de confirmación */}
      {showConfirmation && (
        <div className="fixed top-20 right-5 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-slideIn">
          <FaCheckCircle className="text-white text-2xl" />
          <span className="text-lg">Cambios guardados correctamente</span>
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
