"use client";

import React from "react";
import Link from "next/link";
import Carousel from "@/components/Carousel";

const LandingPage = () => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen w-full bg-cover bg-center px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: "url('/images/background.jpg')" }}
    >
      <div className="text-center bg-white bg-opacity-70 rounded-lg p-6 sm:p-8 shadow-lg max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl w-full">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-[#691B31]">
          Unidad Central de Correspondencia
        </h1>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-[#691B31]">
          Tula de Allende
        </h2>
        <p className="text-base sm:text-lg text-[#333] mb-6 sm:mb-8">
          Inicie sesión para continuar:
        </p>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
          <Link href="/login">
            <button className="bg-[#691B31] text-white px-6 sm:px-7 py-2 sm:py-3 rounded-lg shadow-md hover:bg-[#8A233E] transition duration-200 transform hover:scale-105 focus:ring-2 focus:ring-[#691B31]"
            >
              Iniciar Sesión
            </button>
          </Link>
          
        </div>
        <div className="mt-6 sm:mt-8">
          <Carousel />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
