"use client";

import React from "react";
import Link from "next/link";
import Carousel from "@/components/Carousel";

const LandingPage = () => {
  return (
    <div
      className="grid h-screen place-items-center bg-cover bg-center px-4"
      style={{ backgroundImage: "url('/images/background.jpg')" }}
    >
      <div className="text-center bg-white bg-opacity-70 rounded-lg p-6 sm:p-8 lg:p-10 shadow-lg w-full max-w-[90%] sm:max-w-[70%] lg:max-w-[50%]">
        {/* Títulos Responsivos */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-[#691B31]">
          Unidad Central de Correspondencia
        </h1>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-[#691B31]">
          Tula de Allende
        </h2>
        
        <p className="text-base sm:text-lg text-[#333] mb-6 sm:mb-8">
          Selecciona una opción para continuar:
        </p>

        {/* Botones Responsivos */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
          <Link href="/login" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto bg-[#691B31] text-white px-6 sm:px-7 py-3 rounded-lg shadow-md hover:bg-[#8A233E] transition-all">
              Iniciar Sesión
            </button>
          </Link>

          <Link href="/register" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto bg-[#BC995B] text-white px-6 sm:px-7 py-3 rounded-lg shadow-md hover:bg-[#A37F4D] transition-all">
              Registrate
            </button>
          </Link>
        </div>

        {/* Carrusel Responsivo */}
        <div className="mt-6 sm:mt-8 w-full max-w-[90%] sm:max-w-[80%] mx-auto">
          <Carousel />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
