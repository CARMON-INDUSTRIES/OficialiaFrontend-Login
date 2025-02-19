"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export const Register = () => {
  const [userName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

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
      setError("");

      // SweetAlert de éxito
      Swal.fire({
        title: "¡Registro Exitoso!",
        text: "El usuario se registró correctamente",
        icon: "success",
        confirmButtonColor: "#691B31",
        confirmButtonText: "Aceptar",
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
            src="/images/presidencia.jpeg"
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
    </div>
  );
};

export default Register;