"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const reduceMotion = useReducedMotion();
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setError("");
    setIsSubmitting(true);

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
      setIsSubmitting(false);
    }
  };

  const inputClass = "min-h-11 w-full rounded-lg px-4 py-2 placeholder:text-[#626262] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#691B31]";

  return (
    <main className="grid min-h-[100dvh] bg-stone-50 md:grid-cols-2">
      <div className="login-left hidden flex-col bg-[#691B31] px-8 py-10 text-white md:flex lg:px-16">
        <p className="font-semibold">Presidencia municipal Tula de Allende</p>
        <p className="my-auto py-10 text-[clamp(1.85rem,3.5vw,3rem)] font-bold tracking-tight">
          BIENVENIDO
        </p>
        <ul aria-hidden="true" className="flex items-center gap-5 text-[2rem]">
          <li><FaRunning /></li>
          <li><FaHeartbeat /></li>
          <li><FaLeaf /></li>
          <li><FaPiggyBank /></li>
        </ul>
      </div>

      <section className="flex items-center justify-center px-4 py-8" aria-labelledby="login-title">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0.8, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.22 }}
          className="w-full max-w-[26.5rem]"
        >
          <div className="mb-5 grid justify-items-center gap-4 text-center">
            <h1 id="login-title" className="text-3xl font-bold tracking-tight">
              Inicio de sesión
            </h1>
            <Image
              src="/images/presidencia.png"
              alt="Presidencia municipal"
              width={144}
              height={144}
              className="h-auto w-36 object-contain"
              priority
            />
          </div>

          <form onSubmit={handleLogin} className="grid gap-5 rounded-[20px] border border-[#dedede] bg-white p-5 sm:p-8">
            <div className="grid gap-2">
              <label htmlFor="login-user" className="font-semibold">Usuario</label>
              <input
                id="login-user"
                autoComplete="username"
                type="text"
                placeholder="Nombre de usuario"
                className={inputClass + " bg-[#F5F5F5]"}
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="login-password" className="font-semibold">Contraseña</label>
              <div className="relative">
                <input
                  id="login-password"
                  autoComplete="current-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingrese su contraseña"
                  className={inputClass + " bg-[#EAEAEA] pr-14"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  className="absolute inset-y-0 right-0 grid min-w-11 place-items-center rounded-lg text-lg text-[#691B31] hover:bg-black/5"
                >
                  {showPassword ? <FaEyeSlash aria-hidden="true" /> : <FaEye aria-hidden="true" />}
                </button>
              </div>
            </div>

            {error && <p role="alert" className="text-sm text-red-800">{error}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="min-h-11 rounded-[10px] bg-[#BC995B] px-4 py-2 font-semibold text-[#262626] transition-colors hover:bg-[#b18e50] disabled:cursor-wait disabled:opacity-70"
            >
              {isSubmitting ? "Iniciando sesión…" : "Iniciar sesión"}
            </button>
          </form>
        </motion.div>
      </section>
    </main>
  );
};

export default SignIn;
