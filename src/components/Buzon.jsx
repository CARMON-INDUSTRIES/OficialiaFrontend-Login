"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Buzon() {
  const [notificaciones, setNotificaciones] = useState([]);
  const [nuevaNotificacion, setNuevaNotificacion] = useState(false);
  const API_URL = "https://oficialialoginbackend.somee.com/api/Correspondencia/obtener";

  useEffect(() => {
    const fetchNotificaciones = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Error al obtener los registros");

        const data = await response.json();
        const ultimosRegistros = data
          .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
          .slice(0, 4)
          .map((item) => ({
            id: item.id,
            nombre: item.remitente,
            asunto: item.asunto,
            fecha: new Date(item.fecha).toLocaleDateString("es-MX"),
            estado: item.statusDescripcion,
          }));

        // Si hay nuevos registros, activar la notificación
        if (ultimosRegistros.length > 0 && ultimosRegistros[0].id !== notificaciones[0]?.id) {
          setNuevaNotificacion(true);
          setTimeout(() => setNuevaNotificacion(false), 5000); // Ocultar después de 5s
        }

        setNotificaciones(ultimosRegistros);
      } catch (error) {
        console.error("Error al obtener las notificaciones:", error);
      }
    };

    fetchNotificaciones();
    const interval = setInterval(fetchNotificaciones, 10000); // Consultar cada 10s

    return () => clearInterval(interval);
  }, [notificaciones]);

  const marcarComoLeido = (id) => {
    setNotificaciones((prev) => prev.filter((notif) => notif.id !== id));
  };

  const obtenerColorEstado = (estado) => {
    switch (estado.toLowerCase()) {
      case "registrado":
        return "bg-gray-200";
      case "entregado":
        return "bg-blue-200";
      case "leído":
        return "bg-orange-200";
      case "en proceso":
        return "bg-red-200";
      case "finalizado":
        return "bg-green-200";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen items-center justify-center bg-gray-100 p-6">
      {/* Notificación emergente */}
      {nuevaNotificacion && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed top-5 right-5 bg-[#691B31] text-white px-6 py-3 rounded-lg shadow-lg"
        >
          📩 ¡Nuevo registro recibido!
        </motion.div>
      )}

      {/* Sección Izquierda */}
      <div className="w-full md:w-1/2 flex flex-col justify-center">
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
                className={`p-4 rounded-lg shadow-md flex justify-between items-center ${obtenerColorEstado(
                  notif.estado
                )}`}
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

