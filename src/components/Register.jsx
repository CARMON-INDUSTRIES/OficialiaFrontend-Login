"use client";
import React, { useState } from "react";
import {
  FaArrowLeft,
  FaEye,
  FaEyeSlash,
  FaUserCircle,
  FaFileAlt,
  FaSearch,
  FaClipboardList,
} from "react-icons/fa"; // Importa todos los íconos una sola vez
import Link from "next/link";
import { useRouter } from "next/navigation"; // Importa el hook useRouter
import { useAuth } from "../contexts/AuthContext";

export const Register = () => {
  const [userName, setName] = useState(""); // Estado para el nombre
  const [email, setEmail] = useState(""); // Estado para el correo
  const [password, setPassword] = useState(""); // Estado para la contraseña
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña
  const [error, setError] = useState(""); // Estado para errores
  const router = useRouter(); // Inicializa el hook useRouter
  const { login } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault(); // Evita el recargado de la página

    try {
      const response = await fetch(
        "https://oficialialoginbackend.somee.com/api/Cuentas/UserNuevo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            userName,
            email,
            password, // Enviar la contraseña al backend
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al registrar usuario"); // Maneja errores
      }

      const data = await response.json();
      console.log("Registro exitoso:", data);
      setError(""); // Limpia errores
      login(data);
      router.push("/Consulta"); // Redirige a la página de inicio de sesión
    } catch (err) {
      setError(err.message); // Establece el mensaje de error
    }
  };

  return (
    <div className="grid sm:grid-cols-2 grid-cols-1 auto-rows-[100vh] bg-stone-50">
      <div className="login-left hidden bg-[#691B31] py-10 px-8 lg:px-16 sm:flex flex-col">
        <h1 className="text-white text-1xl font-bold">
          Presidencia municipal Tula de Allende
        </h1>
        <h1 className="text-white text-5xl font-bold my-auto ml-20 lg:ml-32">
          REGISTRO
        </h1>
        <div className="socials ml-8 lg:ml-24">
          <ul className="right list-none flex items-center gap-6">
            <li>
              <FaUserCircle className="text-3xl text-slate-50" />
            </li>
            <li>
              <FaFileAlt className="text-3xl text-slate-50" />
            </li>
            <li>
              <FaClipboardList className="text-3xl text-slate-50" />
            </li>
            <li>
              <FaSearch className="text-3xl text-slate-50" />
            </li>
          </ul>
        </div>
      </div>

      {/* Panel derecho */}
      <div className="right flex flex-col justify-center items-center relative">
        <h1 className="top-8 left-8 absolute text-3xl font-bold sm:hidden">
          REGISTRO
        </h1>
        <div className="lg:w-[26.5rem] w-80 flex flex-col gap-4">
          <div className="text-center sm:text-left">
            <br />
            <img
              src="/images/presidencia.jpeg"
              alt="Presidencia"
              className="w-36 h-auto object-cover mb-4 mx-auto"
            />
          </div>

          <form
            onSubmit={handleRegister} // Llama a la función de registro
            className="bg-white rounded-[20px] p-8 flex flex-col gap-5 lg:border-none border border-[#e6ebf4]"
          >
            <div className="name flex flex-col gap-3 items-start">
              <label htmlFor="Name" className="text-sm">
                Nombre de usuario
              </label>
              <input
                type="text"
                placeholder="Ingrese un nombre sin espacios"
                className="w-full px-4 py-2 rounded-lg border-none outline-none bg-[#F5F5F5]"
                value={userName}
                onChange={(e) => setName(e.target.value)} // Actualiza el estado
              />
            </div>

            <div className="email flex flex-col gap-3 items-start">
              <label htmlFor="Email" className="text-sm">
                Correo Electrónico
              </label>
              <input
                type="email"
                placeholder="Ingrese su correo"
                className="w-full px-4 py-2 rounded-lg border-none outline-none bg-[#F5F5F5]"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Actualiza el estado
              />
            </div>

            {/* Campo de Contraseña */}
            <div className="password flex flex-col gap-3 items-start relative">
              <label htmlFor="Password" className="text-sm">
                Contraseña
              </label>
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingrese su contraseña"
                  className="w-full px-4 py-2 rounded-lg border-none outline-none bg-[#F5F5F5] pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Actualiza el estado
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)} // Alterna la visibilidad
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#691B31]"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Muestra errores */}
            {error && <p className="text-red-500">{error}</p>}

            <button
              type="submit"
              className="bg-[#BC995B] text-white rounded-[10px] py-2"
            >
              Registrarse
            </button>

            {/* Botón de regreso */}
            <Link href="/login">
              <div className="flex justify-center items-center w-10 h-10 bg-[#691B31] text-white rounded-full absolute bottom-8 right-14 cursor-pointer">
                <FaArrowLeft />
              </div>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
