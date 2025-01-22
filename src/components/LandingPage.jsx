"use client";

import React from "react";
import Link from "next/link";
import Carousel from "@/components/Carousel";

const LandingPage = () => {
  return (
    <div
      className="grid h-screen place-items-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/background.jpg')" }}
    >
      <div className="text-center bg-white bg-opacity-70 rounded-lg p-8 shadow-lg">
        <h1 className="text-4xl font-bold mb-6 text-[#691B31]">
          Unidad Central de Correspondencia <br /> Tula de Allende
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
        </div>
        <div className="mt-8">
          <Carousel />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

