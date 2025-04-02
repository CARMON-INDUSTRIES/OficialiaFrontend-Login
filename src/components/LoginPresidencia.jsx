"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";

export default function LoginPresidencia() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex h-screen relative">
      {/* Sección izquierda con la imagen */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-1/2 flex items-center justify-center bg-white"
      >
        <div className="relative w-3/4 h-3/4">
          <Image
            src="/images/presidencia.png"
            alt="Presidencia"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </motion.div>

      {/* Sección derecha con el formulario */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="w-1/2 flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/images/login.jpg')" }}
      >
        <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Bienvenido de Nuevo! 👋
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Por favor inicie sesión para revisar su correspondencia interna
          </p>

          <form>
            <div className="mb-4">
              <label className="block text-gray-700">Usuario:</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Nombre de Usuario:"
              />
            </div>

            {/* Campo de contraseña con botón de mostrar/ocultar */}
            <div className="mb-4 relative">
              <label className="block text-gray-700">Contraseña</label>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full p-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
                placeholder="Coloque su contraseña"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-[#691B31] px-2 py-1 rounded-lg transition duration-200 transform hover:scale-105 focus:ring-2 focus:ring-[#691B31]"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button className="w-full bg-[#691B31] text-white p-3 rounded-lg hover:bg-[#A43D55]">
              INICIAR SESIÓN
            </button>
          </form>

          <div className="text-center mt-4">
            <p>
              ¿Usuario Nuevo?{" "}
              <Link href="#" className="text-[#691B31]">
                Crear Cuenta
              </Link>
            </p>
          </div>
        </div>

        {/* Botón para regresar a la landing page */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="absolute bottom-8 right-14"
        >
          <Link href="/">
            <div className="flex justify-center items-center w-12 h-12 bg-white text-[#691B31] rounded-full cursor-pointer transition duration-200 transform hover:scale-110 focus:ring-2 focus:ring-[#691B31] shadow-lg">
              <FaArrowLeft size={20} />
            </div>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

