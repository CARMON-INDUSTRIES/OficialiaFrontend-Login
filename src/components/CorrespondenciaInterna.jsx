"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaUser, FaSignOutAlt, FaFileAlt, FaEnvelope, FaCalendarAlt } from "react-icons/fa";

const CorrespondenciaInterna = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 lg:px-12 py-4 shadow-md bg-[#691B31] text-white">
        <div className="flex items-center gap-6">
          <FaUser size={20} />
          <span>Nombre Usuario</span>
          <div className="flex gap-6">
            <Link href="#" className="hover:underline">
              Consultar
            </Link>
            <Link href="#" className="hover:underline">
              Generar
            </Link>
            <Link href="#" className="hover:underline">
              Buzón
            </Link>
          </div>
        </div>

        <button className="flex items-center gap-2 hover:opacity-80">
          <FaSignOutAlt size={20} />
          <span>Cerrar Sesión</span>
        </button>
      </nav>

      {/* Contenido Principal */}
      <div className="flex flex-col lg:flex-row items-center justify-between px-6 lg:px-16 py-12">
        {/* Texto y Botón */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h2 className="text-4xl font-bold text-[#691B31] mb-4">
            Correspondencia Interna
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            La correspondencia interna en la Presidencia Municipal de Tula
            Hidalgo permite la gestión eficiente de documentos oficiales entre
            las diferentes áreas, asegurando un flujo organizado y seguro de la
            información.
          </p>
          <button className="bg-[#691B31] text-white px-6 py-3 rounded-lg shadow-md transition hover:scale-105">
            Generar Correspondencia
          </button>

          {/* Tabla de correspondencia */}
          <div className="mt-8 overflow-x-auto">
            <table className="w-full border-collapse border border-[#BC995B] shadow-md">
              <thead className="bg-white text-black">
                <tr>
                  <th className="py-2 px-4 border border-[#BC995B]">
                    <FaFileAlt className="inline-block mr-2" />
                    Folio
                  </th>
                  <th className="py-2 px-4 border border-[#BC995B]">
                    <FaEnvelope className="inline-block mr-2" />
                    Asunto
                  </th>
                  <th className="py-2 px-4 border border-[#BC995B]">
                    <FaCalendarAlt className="inline-block mr-2" />
                    Fecha
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="text-center bg-gray-100">
                  <td className="py-2 px-4 border border-[#BC995B]">PMT-001</td>
                  <td className="py-2 px-4 border border-[#BC995B]">Solicitud de material</td>
                  <td className="py-2 px-4 border border-[#BC995B]">2025-04-03</td>
                </tr>
                <tr className="text-center">
                  <td className="py-2 px-4 border border-[#BC995B]">PMT-002</td>
                  <td className="py-2 px-4 border border-[#BC995B]">Informe de actividades</td>
                  <td className="py-2 px-4 border border-[#BC995B]">2025-04-02</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Imágenes sobrepuestas */}
        <div className="lg:w-1/2 relative flex justify-center mt-8 lg:mt-0">
          <div className="relative w-full max-w-md">
            <Image
              src="/images/fondoo.jpg"
              alt="Fondo"
              width={700}
              height={500}
              className="w-full h-[500px] object-cover"
            />
            <Image
              src="/images/correspondenciaInterna.jpg"
              alt="Correspondencia"
              width={800}
              height={700}
              className="absolute top-10 left-10 rounded-lg shadow-lg border-4 border-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CorrespondenciaInterna;
