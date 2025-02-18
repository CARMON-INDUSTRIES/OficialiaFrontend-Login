"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Buzon() {
  const [notificaciones, setNotificaciones] = useState([]);

  useEffect(() => {
    // Simulando datos de registros (esto vendría de tu API)
    setTimeout(() => {
      setNotificaciones([
        { id: 1, nombre: "Juan Pérez", asunto: "Solicitud de trámite", fecha: "2025-02-05", estado: "Pendiente" },
        { id: 2, nombre: "María López", asunto: "Documento recibido", fecha: "2025-02-04", estado: "Completado" },
        { id: 3, nombre: "Carlos Ramírez", asunto: "Revisión en proceso", fecha: "2025-02-03", estado: "En proceso" },
      ]);
    }, 1000);
  }, []);

  // Función para eliminar notificación al marcarla como leída
  const marcarComoLeido = (id) => {
    setNotificaciones((prev) => prev.filter((notif) => notif.id !== id));
  };

  return (
    <div className="flex flex-col md:flex-row h-screen items-center justify-center bg-gray-100 p-6">
      {/* Sección Izquierda */}
      <div className="w-full md:w-1/2 flex flex-col justify-center">
        {/* Animación del título */}
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
        >
          Buzón de entrada
        </motion.h1>

        {/* Lista de notificaciones */}
        <div className="space-y-4">
          {notificaciones.length === 0 ? (
            <p className="text-gray-600 text-lg">No tienes notificaciones pendientes 🎉</p>
          ) : (
            notificaciones.map((notif) => (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className={`p-4 rounded-lg shadow-md flex justify-between items-center ${
                  notif.estado === "Pendiente"
                    ? "bg-red-100"
                    : notif.estado === "Completado"
                    ? "bg-green-100"
                    : "bg-yellow-100"
                }`}
              >
                <div>
                  <p className="text-lg font-semibold">{notif.nombre}</p>
                  <p className="text-gray-700">{notif.asunto}</p>
                  <p className="text-sm text-gray-500">
                    📅 {notif.fecha} - <span className="font-bold">{notif.estado}</span>
                  </p>
                </div>
                <button
                  onClick={() => marcarComoLeido(notif.id)}
                  className="bg-[#691B31] text-white px-3 py-1 rounded-md hover:bg-[#A87F50] transition"
                >
                  Marcar como leído 
                </button>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Sección Derecha con Imagen */}
      <motion.div
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full md:w-1/2 flex justify-center"
      >
        <Image
          src="/images/buzon.png"
          alt="Buzón"
          width={400}
          height={400}
          className="max-w-full"
        />
      </motion.div>
    </div>
  );
}


