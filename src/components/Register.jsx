"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import axios from "axios";

export const Register = () => {
  const [userName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState("");
  const [userId, setUserId] = useState(null); // Para almacenar el ID del usuario registrado
  const [isAreaModalOpen, setIsAreaModalOpen] = useState(false); // Controla el modal de área
  const closeAreaModal = () => {
    setIsAreaModalOpen(false); // Asegura que esta variable de estado exista en tu componente
  };
  
  const router = useRouter();

  // Obtener las áreas disponibles
  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await axios.get(
          "https://oficialialoginbackend.somee.com/api/Correspondencia/obtener-areas"
        );
        setAreas(response.data);
      } catch (error) {
        console.error("Error al obtener las áreas:", error);
      }
    };

    fetchAreas();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://oficialialoginbackend.somee.com/api/Cuentas/UserNuevo",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ userName, email, password }),
        }
      );

      if (!response.ok) throw new Error("Error al registrar usuario");

      const data = await response.json();
      

      setUserId(data.userId); // Guarda el userId en el estado
  

      setError("");

      // SweetAlert de éxito
      Swal.fire({
        title: "¡Registro Exitoso!",
        text: "El usuario se registró correctamente",
        icon: "success",
        confirmButtonColor: "#691B31",
        confirmButtonText: "Aceptar",
      }).then(() => {
        setIsAreaModalOpen(true); // Abre el modal para asignar área
      });
    } catch (err) {
      setError(err.message);

      // SweetAlert de error
      Swal.fire({
        title: "¡Error!",
        text: "Ha ocurrido un error en el registro",
        icon: "error",
        confirmButtonColor: "#691B31",
        confirmButtonText: "Intentar de nuevo",
      });
    }
  };

  const handleAssignArea = async () => {
   

    if (!selectedArea || !userId) return;

    try {
      await axios.post(
        "https://oficialialoginbackend.somee.com/api/UsuarioArea/AsignarArea",
        {
          userId, // Ahora ya estás usando 'userId' directamente
          areaId: selectedArea,
        }
      );

      Swal.fire({
        title: "Área Asignada",
        text: "El usuario fue asignado correctamente al área",
        icon: "success",
        confirmButtonColor: "#691B31",
        confirmButtonText: "Aceptar",
      });

      setIsAreaModalOpen(false); // Cierra el modal
    } catch (error) {
      console.error("Error al asignar el área:", error);
      Swal.fire({
        title: "¡Error!",
        text: "No se pudo asignar el área. Intente nuevamente.",
        icon: "error",
        confirmButtonColor: "#691B31",
        confirmButtonText: "Cerrar",
      });
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://oficialialoginbackend.somee.com/api/Usuarios");
      // Actualiza el estado de la lista de usuarios con la respuesta
      setUsers(response.data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };
  
  // Llamar a fetchUsers después de registrar el usuario
  fetchUsers();
   

  return (
    <div className="right flex flex-col justify-center items-center relative">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="lg:w-[26.5rem] w-80 flex flex-col gap-4"
      >
        <div className="text-center sm:text-left">
          <h1 className="text-center text-3xl font-bold text-[#621132] ">
            Nuevo Usuario
          </h1>
          <br />
          <img
            src="/images/presidencia.png"
            alt="Presidencia"
            className="w-36 h-auto object-cover mb-4 mx-auto"
          />
        </div>

        <form
          onSubmit={handleRegister}
          className="bg-white rounded-[20px] p-8 flex flex-col gap-5 lg:border-none border border-[#e6ebf4]"
        >
          <div className="name flex flex-col gap-3 items-start">
            <label className="text-sm">Nombre de usuario</label>
            <input
              type="text"
              placeholder="Ingrese un nombre sin espacios"
              className="w-full px-4 py-2 rounded-lg border-none outline-none bg-[#F5F5F5]"
              value={userName}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="email flex flex-col gap-3 items-start">
            <label className="text-sm">Correo Electrónico</label>
            <input
              type="email"
              placeholder="Ingrese su correo"
              className="w-full px-4 py-2 rounded-lg border-none outline-none bg-[#F5F5F5]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="password flex flex-col gap-3 items-start relative">
            <label className="text-sm">Contraseña</label>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Minimo 6 caracteres"
                className="w-full px-4 py-2 rounded-lg border-none outline-none bg-[#F5F5F5] pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#691B31]"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            className="bg-[#BC995B] text-white rounded-[10px] py-2"
          >
            Registrarse
          </button>
        </form>
      </motion.div>

      {/* Modal para asignar área */}
{isAreaModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative"
    >
      {/* Botón de cierre (tache) */}
      <button
        onClick={closeAreaModal}
        className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-2xl font-bold"
      >
        &times;
      </button>

      <h2 className="text-xl font-bold text-center text-[#621132] mb-4">
        ¿A qué área pertenece este usuario?
      </h2>

      <select
        value={selectedArea}
        onChange={(e) => setSelectedArea(e.target.value)}
        className="w-full px-4 py-2 mb-4 rounded-lg border outline-none bg-[#F5F5F5]"
      >
        <option value="">Seleccione un área</option>
        {areas.map((area) => (
          <option key={area.idArea} value={area.idArea}>
            {area.nombreArea}
          </option>
        ))}
      </select>

      <button
        onClick={handleAssignArea}
        className="bg-[#BC995B] text-white w-full py-2 rounded-lg"
      >
        Asignar Área
      </button>
    </motion.div>
  </div>
)}

    </div>
  );
};

export default Register;
