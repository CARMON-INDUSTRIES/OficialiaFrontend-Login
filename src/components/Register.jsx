"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaEye,
  FaEyeSlash,
  FaUserCircle,
  FaFileAlt,
  FaSearch,
  FaClipboardList,
} from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
      router.push("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="grid sm:grid-cols-2 grid-cols-1 auto-rows-[100vh] bg-stone-50">
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="login-left hidden bg-[#691B31] py-10 px-8 lg:px-16 sm:flex flex-col"
      >
        <h1 className="text-white text-1xl font-bold">
          Presidencia municipal Tula de Allende
        </h1>
        <h1 className="text-white text-5xl font-bold my-auto ml-20 lg:ml-32">
          REGISTRO
        </h1>
        <div className="socials ml-8 lg:ml-24">
          <ul className="list-none flex items-center gap-6">
            <li><FaUserCircle className="text-3xl text-slate-50" /></li>
            <li><FaFileAlt className="text-3xl text-slate-50" /></li>
            <li><FaClipboardList className="text-3xl text-slate-50" /></li>
            <li><FaSearch className="text-3xl text-slate-50" /></li>
          </ul>
        </div>
      </motion.div>

      <div className="right flex flex-col justify-center items-center relative">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="top-8  absolute text-center text-3xl font-bold sm:hidden"
        >
          REGISTRO
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="lg:w-[26.5rem] w-80 flex flex-col gap-4"
        >
          <div className="text-center sm:text-left">
            <br />
            <img src="/images/presidencia.jpeg" alt="Presidencia" className="w-36 h-auto object-cover mb-4 mx-auto" />
          </div>

          <form
            onSubmit={handleRegister}
            className="bg-white rounded-[20px] p-8 flex flex-col gap-5 lg:border-none border border-[#e6ebf4]"
          >
            <div className="name flex flex-col gap-3 items-start">
              <label className="text-sm">Nombre de usuario</label>
              <input type="text" placeholder="Ingrese un nombre sin espacios" className="w-full px-4 py-2 rounded-lg border-none outline-none bg-[#F5F5F5]" value={userName} onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="email flex flex-col gap-3 items-start">
              <label className="text-sm">Correo Electrónico</label>
              <input type="email" placeholder="Ingrese su correo" className="w-full px-4 py-2 rounded-lg border-none outline-none bg-[#F5F5F5]" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="password flex flex-col gap-3 items-start relative">
              <label className="text-sm">Contraseña</label>
              <div className="relative w-full">
                <input type={showPassword ? "text" : "password"} placeholder="Ingrese su contraseña" className="w-full px-4 py-2 rounded-lg border-none outline-none bg-[#F5F5F5] pr-10" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#691B31]">
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <button type="submit" className="bg-[#BC995B] text-white rounded-[10px] py-2">Registrarse</button>

            <Link href="/login">
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

export default Register;
