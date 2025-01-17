"use client";
import React from "react";

import { FaRunning, FaHeartbeat, FaLeaf, FaPiggyBank } from "react-icons/fa";

export const SignIn = () => {
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
            </li>{" "}
            {/* Ícono de deportes */}
            <li>
              <FaHeartbeat className="text-3xl text-slate-50" />
            </li>{" "}
            {/* Ícono de salud */}
            <li>
              <FaLeaf className="text-3xl text-slate-50" />
            </li>{" "}
            {/* Ícono de protección ambiental */}
            <li>
              <FaPiggyBank className="text-3xl text-slate-50" />
            </li>{" "}
            {/* Ícono de tesorería municipal */}
          </ul>
        </div>
      </div>
      <div className="right flex flex-col justify-center items-center relative">
        <h1 className="top-8 left-8 absolute text-3xl font-bold sm:hidden">
          BIENVENIDO
        </h1>
        <div className="lg:w-[26.5rem] w-80 flex flex-col gap-4 ">
          <div className="text-center sm :text-left">
           
            <h1 className="text-3xl font-bold">Inicio de sesión</h1><br></br>
            
            <img
              src="/images/presidencia.jpeg"
              alt="Presidencia"
              
              className="w-36 h-auto object-cover mb-4 mx-auto"
            />
          </div>

          <form
            action=""
            className="bg-white rounded-[20px] p-8 flex flex-col gap-5 lg:border-none border border-[#e6ebf4]"
          >
            <div className="email flex flex-col gap-3 items-start">
              <label htmlFor="Email">USUARIO</label>
              <input
                type="email"
                placeholder="Nombre o email"
                className="w-full px-4 py-2 rounded-lg border-none outline-none bg-[#F5F5F5]"
              />
            </div>
            <div className="password flex flex-col gap-3 items-start">
              <label htmlFor="Password">CONTRASEÑA</label>
              <input
                type="password"
                placeholder="Ingrese su contraseña"
                className="w-full px-4 py-2 rounded-lg border-none outline-none bg-[#EAEAEA]"
              />
            </div>
            <p>
              <a href="#" className="text-[#A02142]">
                ¿Olvidaste tu contraseña?
              </a>
            </p>
            <button className="bg-[#BC995B] text-white rounded-[10px] py-2 ">
              Iniciar Sesión
            </button>
          </form>
          
        </div>
        <ul className="right list-none flex items-center gap-6 bottom-8 absolute sm:hidden">
          <li>
            <FaRunning className="text-3xl text-slate-50" />
          </li>{" "}
          {/* Ícono de deportes */}
          <li>
            <FaHeartbeat className="text-3xl text-slate-50" />
          </li>{" "}
          {/* Ícono de salud */}
          <li>
            <FaLeaf className="text-3xl text-slate-50" />
          </li>{" "}
          {/* Ícono de protección ambiental */}
          <li>
            <FaPiggyBank className="text-3xl text-slate-50" />
          </li>{" "}
          {/* Ícono de tesorería municipal */}
        </ul>
      </div>
    </div>
  );
};

export default SignIn;
