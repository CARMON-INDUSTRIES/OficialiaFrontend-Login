"use client";

import React from "react";
import Link from "next/link";
import Carousel from "@/components/Carousel";

const LandingPage = () => {
  return (
    <div className="grid h-screen place-items-center bg-[#F5F5F5]">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6 text-[#691B31]">
         Unidad Central de Correspondencia <br></br>Tula de Allende
        </h1>
        <p className="text-lg text-[#333] mb-8">
          Selecciona una opción para continuar:
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          {/* Botón para inicio de sesión */}
          <Link href="/login">
            <button className="bg-[#691B31] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#8A233E] transition-all">
              Iniciar Sesión
            </button>
          </Link>
          {/* Botón para consulta 
          <Link href="/consulta">
            <button className="bg-[#BC995B] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#D1B074] transition-all">
              Consultas
            </button>
          </Link>
          {/* Botón para solicitud 
          <Link href="/solicitud">
            <button className="bg-[#6C7B95] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#8493AD] transition-all">
              Solicitudes
            </button>
          </Link>
          */}

          
        </div>
        <div>
          <br></br>
            <Carousel />
          </div>
      </div>
    </div>
  );
};

export default LandingPage;
