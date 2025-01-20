"use client";
import React, { useState } from "react";
import Link from 'next/link'; // Importar Link de Next.js

import {
  FaRunning,
  FaHeartbeat,
  FaLeaf,
  FaPiggyBank,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

export const SignIn = () => {
  const [email, setEmail] = useState(""); // Estado para el email
  const [password, setPassword] = useState(""); // Estado para la contraseña
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña
  const [error, setError] = useState(""); // Estado para mensajes de error

  const handleLogin = async (e) => {
    e.preventDefault(); // Evita que la página se recargue

    try {
      const response = await fetch("http://localhost:5205/api/Registro/login", {
        method: "POST", // Método de la solicitud
        headers: {
          "Content-Type": "application/json", // Tipo de contenido
        },
        body: JSON.stringify({
          email, // Envía el email
          password, // Envía la contraseña
        }),
      });

      if (!response.ok) {
        throw new Error("Credenciales incorrectas"); // Manejo de errores
      }

      const data = await response.json();
      console.log("Login exitoso:", data);

      // Puedes redirigir al usuario o realizar otras acciones
      alert("Inicio de sesión exitoso");
    } catch (err) {
      setError(err.message); // Muestra el mensaje de error
    }
  };

  return (
    <div className="grid sm:grid-cols-2 grid-cols-1 auto-rows-[100vh] bg-stone-50">
      <div className="login-left hidden bg-[#691B31] py-10 px-8 lg:px-16 sm:flex flex-col">
        <h1 className="text-white text-1xl font-bold">
          Presidencia municipal Tula de Allende
        </h1>
        <h1 className="text-white text-5xl font-bold my-auto ml-20 lg:ml-32">
          BIENVENIDO
        </h1>
        <div className="socials ml-8 lg:ml-24">
          <ul className="right list-none flex items-center gap-6">
            <li>
              <FaRunning className="text-3xl text-slate-50" />
            </li>
            <li>
              <FaHeartbeat className="text-3xl text-slate-50" />
            </li>
            <li>
              <FaLeaf className="text-3xl text-slate-50" />
            </li>
            <li>
              <FaPiggyBank className="text-3xl text-slate-50" />
            </li>
          </ul>
        </div>
      </div>
      <div className="right flex flex-col justify-center items-center relative">
        <h1 className="top-8 left-8 absolute text-3xl font-bold sm:hidden">
          BIENVENIDO
        </h1>
        <div className="lg:w-[26.5rem] w-80 flex flex-col gap-4">
          <div className="text-center sm :text-left">
            <h1 className="text-3xl font-bold">Inicio de sesión</h1>
            <br></br>
            <img
              src="/images/presidencia.jpeg"
              alt="Presidencia"
              className="w-36 h-auto object-cover mb-4 mx-auto"
            />
          </div>

          <form
            onSubmit={handleLogin} // Llama al manejador de eventos
            className="bg-white rounded-[20px] p-8 flex flex-col gap-5 lg:border-none border border-[#e6ebf4]"
          >
            <div className="email flex flex-col gap-3 items-start">
              <label htmlFor="Email" className="text-sm">
                USUARIO
              </label>
              <input
                type="text"
                placeholder="Nombre o email"
                className="w-full px-4 py-2 rounded-lg border-none outline-none bg-[#F5F5F5]"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Actualiza el estado
              />
            </div>

            <div className="password flex flex-col gap-3 items-start relative">
              <label htmlFor="Password" className="text-sm">
                CONTRASEÑA
              </label>
              <div className="flex items-center w-full relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingrese su contraseña"
                  className="w-full px-4 py-2 rounded-lg border-none outline-none bg-[#EAEAEA]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Actualiza el estado
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)} // Alterna la visibilidad
                  className="absolute right-3 text-[#691B31]"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <p>
              <a href="#" className="text-[#A02142]">
                ¿Olvidaste tu contraseña?
              </a>
            </p>
            <button
              type="submit"
              className="bg-[#BC995B] text-white rounded-[10px] py-2"
            >
              Iniciar Sesión
            </button>
            <p>
          {/* Usamos Link de Next.js para la navegación */}
          <Link href="/register" className="text-[#A02142]">REGISTRATE
          </Link>
        </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
