"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import DetalleNotificacion from "./DetalleNotificacion";
import Respuesta from "./Respuesta"; // Importar el nuevo componente

import { jwtDecode } from "jwt-decode";

export default function Buzon() {
  const [notificaciones, setNotificaciones] = useState([]);
  const [nuevaNotificacion, setNuevaNotificacion] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [modalRespuesta, setModalRespuesta] = useState(null);
  const [modalDetalle, setModalDetalle] = useState(null);
 
  const API_URL =
    "https://oficialialoginbackend.somee.com/api/Correspondencia/obtener";

  useEffect(() => {
    const fetchNotificaciones = async () => {
      try {
        // Obtener token del localStorage
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("❌ No hay token disponible.");
          return;
        }

        // Decodificar token para obtener userName
        const decodedToken = jwtDecode(token);
        const userName =
          decodedToken[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
          ];

        if (!userName) {
          console.error("❌ No se pudo obtener el nombre de usuario.");
          return;
        }

        console.log("✅ Usuario autenticado:", userName);

        // Obtener userId del backend
        const userIdResponse = await fetch(
          `https://oficialialoginbackend.somee.com/api/Cuentas/GetUserId/${userName}`
        );

        const userIdData = await userIdResponse.json();
        const userId = userIdData.userId;

        if (!userId) {
          console.error("No se obtuvo userId xd.");
          return;
        }

        console.log("✅ UserId obtenido:", userId);

        // Obtener registros filtrados por userId
        const response = await fetch(`${API_URL}?userId=${userId}`);

        if (!response.ok) throw new Error("❌ Error al obtener los registros");

        const data = await response.json();
        console.log("📩 Datos obtenidos:", data);

        // Procesar datos
        const ultimosRegistros = data
        .filter(item => !item.respuestaCorrecta) // 🔥 Filtra los que NO tienen respuesta
          .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
          .slice(0, 5)
          .map((item) => ({
            id: item.id,
            folio: item.folio,
            remitente: item.remitente,
            dependencia: item.dependencia,
            cargoRemitente: item.cargoRemitente,
            cargoDestinatario: item.cargoDestinatario,
            destinatario: item.destinatario,
            asunto: item.asunto,
            fecha: new Date(item.fecha).toLocaleDateString("es-MX"),
            estado: item.statusDescripcion,
            comunidad: item.comunidad,
            area: item.area,
            importancia: item.importancia,
            status: item.status,
            comunidadDescripcion: item.comunidadDescripcion,
            areaDescripcion: item.areaDescripcion,
            importanciaDescripcion: item.importanciaDescripcion,
            statusDescripcion: item.statusDescripcion,
            documento: item.documento,
            respuesta: item.respuestaCorrecta,
          }));

          const nuevosRegistros = ultimosRegistros.filter(
            (nuevo) => !notificaciones.some((anterior) => anterior.id === nuevo.id)
          );
    
          if (nuevosRegistros.length > 0) {
            setNuevaNotificacion(true);
            setTimeout(() => setNuevaNotificacion(false), 5000); // Ocultar después de 5s
          }
    
          setNotificaciones(ultimosRegistros);
        } catch (error) {
          console.error("Error:", error);
        }
      };
    
      fetchNotificaciones();
      const interval = setInterval(fetchNotificaciones, 20000);
    
      return () => clearInterval(interval);
    }, [notificaciones]); // 🔥 Agregamos `notificaciones` como dependencia


  const obtenerColorEstado = (estado) => {
    switch (estado.toLowerCase()) {
      case "registrado":
        return "bg-gray-200";
      case "entregado":
        return "bg-blue-200";
      case "leido":
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
            <p className="text-gray-600 text-lg">
              No tienes notificaciones pendientes 🎉
            </p>
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
                  <p className="text-lg font-semibold">{notif.remitente}</p>
                  <p className="text-gray-700">{notif.asunto}</p>
                  <p className="text-sm text-gray-500">
                    📅 {notif.fecha} -{" "}
                    <span className="font-bold">{notif.estado}</span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedRecord(notif)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md transition duration-300 transform hover:scale-105 focus:ring-2 focus:ring-blue-700"
                  >
                    Detalles
                  </button>
                  <button onClick={() => setModalRespuesta(notif)} className="bg-green-500 text-white px-3 py-1 rounded-md transition duration-300 transform hover:scale-105 focus:ring-2 focus:ring-green-700">Responder</button>
                 
                </div>
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

      {/* Mostrar Detalles de la notificación */}
      {selectedRecord && (
        <DetalleNotificacion
          selectedRecord={selectedRecord}
          closeModal={() => setSelectedRecord(null)}
        />
      )}

{modalRespuesta && <Respuesta selectedRecord={modalRespuesta} closeModal={() => setModalRespuesta(null)} />}
    </div>
  );
}
