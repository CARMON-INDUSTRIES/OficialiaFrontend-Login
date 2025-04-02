"use client";

import React from "react";
import Link from "next/link";
import Carousel from "@/components/Carousel";
import { FaLock, FaCloudUploadAlt, FaClock, FaNetworkWired } from "react-icons/fa";

const LandingPage = () => {
  return (
    <div className="min-h-screen w-full bg-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 lg:px-12 py-4 shadow-md bg-[#691B31] text-white">
        <h1 className="text-lg sm:text-xl font-bold">PRESIDENCIA MUNICIPAL DE TULA HIDALGO</h1>
      </nav>

      {/* Contenido Principal */}
      <div className="flex flex-col lg:flex-row items-center justify-between px-6 lg:px-16 py-12">
        {/* Texto y Botones */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h2 className="text-4xl font-bold text-[#691B31] mb-4">Unidad Central de Correspondencia</h2>
          <p className="text-lg text-gray-700 mb-6">
            La Unidad Central de Correspondencia de la Presidencia de Tula Hidalgo gestiona la
            recepción, distribución y seguimiento de documentos oficiales, asegurando un flujo
            eficiente de información dentro de la administración pública.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link href="/login">
              <button className="bg-[#691B31] text-white px-6 py-3 rounded-lg shadow-md transition hover:scale-105">Correspondencia Externa</button>
            </Link>
            <Link href="/loginPresidencia">
              <button className="bg-[#BC995B] text-white px-6 py-3 rounded-lg shadow-md transition hover:scale-105">Correspondencia Interna</button>
            </Link>
          </div>
        </div>

        {/* Carrusel */}
        <div className="lg:w-1/2 mt-8 lg:mt-0 flex justify-center">
          <Carousel />
        </div>
      </div>

      {/* Beneficios */}
      <div className="py-12 px-6 lg:px-16 text-center bg-[#691B31] text-white">
        <h3 className="text-2xl font-bold mb-6">Beneficios de la Unidad Central de Correspondencia</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="flex flex-col items-center">
            <FaLock size={40} className="mb-2" />
            <p>Seguridad en la documentación</p>
          </div>
          <div className="flex flex-col items-center">
            <FaCloudUploadAlt size={40} className="mb-2" />
            <p>Acceso rápido y digitalizado</p>
          </div>
          <div className="flex flex-col items-center">
            <FaClock size={40} className="mb-2" />
            <p>Optimización de tiempos de entrega</p>
          </div>
          <div className="flex flex-col items-center">
            <FaNetworkWired size={40} className="mb-2" />
            <p>Comunicación eficiente entre áreas</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;