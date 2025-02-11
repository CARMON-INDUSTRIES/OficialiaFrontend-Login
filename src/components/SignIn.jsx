"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion"; // Importamos Framer Motion
import {
  FaArrowLeft,
  FaRunning,
  FaHeartbeat,
  FaLeaf,
  FaPiggyBank,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

export const SignIn = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://oficialialoginbackend.somee.com/api/Cuentas/UserLogin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ userName, password }),
        }
      );

      if (!response.ok) throw new Error("Credenciales incorrectas");

      const data = await response.json();
      if (!data.token) throw new Error("No se recibió un token de autenticación");

      localStorage.setItem("token", data.token);
      document.cookie = `token=${data.token}; path=/; secure; samesite=strict`;

      router.push("/consulta");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="grid sm:grid-cols-2 grid-cols-1 auto-rows-[100vh] bg-stone-50">
      {/* Sección Izquierda */}
      <motion.div
        initial={{ opacity: 0, x: -100 }} // Aparece desde la izquierda
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="login-left hidden bg-[#691B31] py-10 px-8 lg:px-16 sm:flex flex-col"
      >
        <h1 className="text-white text-1xl font-bold">
          Presidencia municipal Tula de Allende
        </h1>
        <h1 className="text-white text-5xl font-bold my-auto ml-20 lg:ml-32">
          BIENVENIDO
        </h1>
        <div className="socials ml-8 lg:ml-24">
          <ul className="right list-none flex items-center gap-6">
            <li><FaRunning className="text-3xl text-slate-50" /></li>
            <li><FaHeartbeat className="text-3xl text-slate-50" /></li>
            <li><FaLeaf className="text-3xl text-slate-50" /></li>
            <li><FaPiggyBank className="text-3xl text-slate-50" /></li>
          </ul>
        </div>
      </motion.div>

      {/* Sección Derecha */}
      <div className="right flex flex-col justify-center items-center relative">
        <motion.h1
          initial={{ opacity: 0, y: -20 }} // Aparece desde arriba
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="top-8 left-8 absolute text-3xl font-bold sm:hidden"
        >
          BIENVENIDO
        </motion.h1>

        {/* Animación del formulario */}
        <motion.div
          initial={{ opacity: 0, y: 50 }} // Aparece desde abajo
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="lg:w-[26.5rem] w-80 flex flex-col gap-4"
        >
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold">Inicio de sesión</h1>
            <br />
            <img
              src="/images/presidencia.jpeg"
              alt="Presidencia"
              className="w-36 h-auto object-cover mb-4 mx-auto"
            />
          </div>

          <form
            onSubmit={handleLogin}
            className="bg-white rounded-[20px] p-8 flex flex-col gap-5 lg:border-none border border-[#e6ebf4]"
          >
            <div className="email flex flex-col gap-3 items-start">
              <label htmlFor="Name" className="text-sm">USUARIO</label>
              <input
                type="text"
                placeholder="Nombre de usuario"
                className="w-full px-4 py-2 rounded-lg border-none outline-none bg-[#F5F5F5]"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div className="password flex flex-col gap-3 items-start relative">
              <label htmlFor="Password" className="text-sm">CONTRASEÑA</label>
              <div className="flex items-center w-full relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingrese su contraseña"
                  className="w-full px-4 py-2 rounded-lg border-none outline-none bg-[#EAEAEA]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-[#691B31]"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <p><a href="#" className="text-[#A02142]">¿Olvidaste tu contraseña?</a></p>

            <button type="submit" className="bg-[#BC995B] text-white rounded-[10px] py-2">
              Iniciar Sesión
            </button>

            <p>
              <Link href="/register" className="text-[#A02142]">REGISTRATE</Link>
            </p>

            <Link href="/">
              <div className="flex justify-center items-center w-10 h-10 bg-[#691B31] text-white rounded-full absolute bottom-8 right-14 cursor-pointer">
                <FaArrowLeft />
              </div>
            </Link>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default SignIn;
