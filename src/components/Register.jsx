"use client";
import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa"; // Importa el icono
import Link from "next/link"; // Importa el componente Link de Next.js

export const Register = () => {
  const [usuario, setName] = useState(""); // Estado para el nombre
  const [email, setEmail] = useState(""); // Estado para el correo
  const [password, setPassword] = useState(""); // Estado para la contraseña
  const [error, setError] = useState(""); // Estado para errores
  const [success, setSuccess] = useState(""); // Estado para mensaje de éxito

  const handleRegister = async (e) => {
    e.preventDefault(); // Evita el recargado de la página

    try {
      const response = await fetch("http://localhost:5299/api/Cuenta/registrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario,
          email,
          password, // Enviar la contraseña al backend
        }),
      });

      if (!response.ok) {
        throw new Error("Error al registrar usuario"); // Maneja errores
      }

      const data = await response.json();
      console.log("Registro exitoso:", data);
      setSuccess("Usuario registrado exitosamente");
      setError(""); // Limpia errores
    } catch (err) {
      setError(err.message); // Establece el mensaje de error
      setSuccess(""); // Limpia mensajes de éxito
    }
  };

  return (
    <div className="grid sm:grid-cols-2 grid-cols-1 auto-rows-[100vh] bg-stone-50">
      {/* Panel izquierdo */}
      <div className="register-left hidden bg-[#691B31] py-10 px-8 lg:px-16 sm:flex flex-col">
        <h1 className="text-white text-1xl font-bold">
          Presidencia municipal Tula de Allende
        </h1>
        <h1 className="text-white text-5xl font-bold my-auto ml-20 lg:ml-32">
          REGISTRO
        </h1>
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
                Nombre Completo
              </label>
              <input
                type="text"
                placeholder="Ingrese su nombre completo"
                className="w-full px-4 py-2 rounded-lg border-none outline-none bg-[#F5F5F5]"
                value={usuario}
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
            <div className="password flex flex-col gap-3 items-start">
              <label htmlFor="Password" className="text-sm">
                Contraseña
              </label>
              <input
                type="password"
                placeholder="Ingrese su contraseña"
                className="w-full px-4 py-2 rounded-lg border-none outline-none bg-[#F5F5F5]"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Actualiza el estado
              />
            </div>

            {/* Muestra errores o mensajes de éxito */}
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}

            <button
              type="submit"
              className="bg-[#BC995B] text-white rounded-[10px] py-2"
            >
              Registrarse
                 {/* Botón de regreso */}
          <Link href="/login">
            <div className="flex justify-center items-center w-10 h-10 bg-[#691B31] text-white rounded-full absolute bottom-8 right-14 cursor-pointer">
              <FaArrowLeft />
            </div>
          </Link>
            </button>
         

          </form>

          
        </div>
      </div>
    </div>
  );
};

export default Register;
