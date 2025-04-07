"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios"; // Asegúrate de tener axios instalado
import { X } from "lucide-react"; // Importa el ícono de Lucide

const DetalleModal = ({ selectedRecord, closeModal }) => {
  const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);
  const [responseDetails, setResponseDetails] = useState(null);
  const [loadingResponse, setLoadingResponse] = useState(false);
  const [error, setError] = useState(null);

  const openResponseModal = async () => {

    if (!selectedRecord.respuestaCorrecta) {
      setError("No hay respuesta asociada a este registro.");
      return;
    }

    setLoadingResponse(true);
    setError(null);

    try {
      // Realizamos la solicitud utilizando el idRespuesta (respuestaCorrecta)
      const response = await axios.get(
        `https://oficialialoginbackend.somee.com/api/Respuesta/obtener/${selectedRecord.respuestaCorrecta}`
      );

      const responseData = response.data;
     
      // Verificamos si encontramos la respuesta
      if (responseData && responseData.idRespuesta) {
        setResponseDetails(responseData); // Asumimos que la respuesta está en el primer elemento
      } else {
        setError("No se encontró una respuesta para este registro.");
      }
    } catch (err) {
      setError("Error al obtener la respuesta.");
      console.error("Error al obtener la respuesta:", err);
    } finally {
      setLoadingResponse(false);
      setIsResponseModalOpen(true);
    }
  };

  // Función para cerrar el modal de respuesta
  const closeResponseModal = () => {
    setIsResponseModalOpen(false);
    setResponseDetails(null);
  };

  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[50]">
        <motion.div
          className="bg-white rounded-lg w-full max-w-4xl md:max-w-2xl lg:max-w-3xl flex flex-col md:flex-row overflow-hidden"
          initial={{ opacity: 0, y: -50 }} // Empieza arriba
          animate={{ opacity: 1, y: 0 }} // Mueve hacia la posición original
          exit={{ opacity: 0, y: 50 }} // Cuando se cierre, mueve hacia abajo
          transition={{
            type: "spring", 
            stiffness: 100, // Qué tan fuerte será el rebote
            damping: 15, // Cuánto se desacelera
            duration: 0.5, // Duración total
          }}
        >
          <div className="w-full md:w-1/3">
            <img
              src="/images/consulta.jpeg"
              alt="Registro"
              className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
            />
          </div>

          <div className="w-full md:w-2/3 p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-[#691B31]">
                Detalles del Registro
              </h2>
              <p className="text-lg mb-2">
                <span className="font-bold">Folio:</span> {selectedRecord.folio}
              </p>
              <p className="text-lg mb-2">
                <span className="font-bold">Fecha:</span>
                {new Date(selectedRecord.fecha).toLocaleDateString("es-MX")}
              </p>
              <p className="text-lg mb-2">
                <span className="font-bold">Dependencia:</span>{" "}
                {selectedRecord.dependencia}
              </p>
              <p className="text-lg mb-2">
                <span className="font-bold">Comunidad:</span>{" "}
                {selectedRecord.comunidadDescripcion}
              </p>
              <p className="text-lg mb-2">
                <span className="font-bold">Remitente:</span>{" "}
                {selectedRecord.remitente}
              </p>
              <p className="text-lg mb-2">
                <span className="font-bold">Cargo Remitente:</span>{" "}
                {selectedRecord.cargoRemitente}
              </p>
              <p className="text-lg mb-2">
                <span className="font-bold">Asunto:</span>{" "}
                {selectedRecord.asunto}
              </p>
              <p className="text-lg mb-2">
                <span className="font-bold">Destinatario:</span>{" "}
                {selectedRecord.destinatario}
              </p>
              <p className="text-lg mb-2">
                <span className="font-bold">Cargo Destinatario:</span>{" "}
                {selectedRecord.cargoDestinatario}
              </p>
              <p className="text-lg mb-2">
                <span className="font-bold">Área(s) turnada(s):</span>{" "}
                {selectedRecord.areaDescripcion}
              </p>
              <p className="text-lg mb-2">
                <span className="font-bold text-red-600">Importancia:</span>{" "}
                {selectedRecord.importanciaDescripcion}
              </p>
              <p className="text-lg mb-2">
                <span className="font-bold">Fecha Terminación: </span>
                {""}
                {new Date(selectedRecord.fechaTerminacion).toLocaleDateString(
                  "es-MX"
                )}
              </p>
              <p className="text-lg mb-2">
                <span className="font-bold text-[#621132]">Status:</span>{" "}
                {selectedRecord.statusDescripcion}
              </p>
            </div>
            
            {selectedRecord?.respuestaCorrecta && (
              <div className="mt-4">
                <button
                  onClick={openResponseModal}
                  className="px-4 py-2 bg-[#56242A] text-white rounded-lg hover:bg-[#691B31] transition duration-300 transform hover:scale-105 focus:ring-2 focus:ring-[#691B31]"
                >
                  RESPUESTA
                </button>
              </div>
            )}

            {/* VISUALIZADOR DE PDF */}
            {selectedRecord?.documento &&
              selectedRecord.documento.endsWith(".pdf") && (
                <div className="mt-4">
                  <button
                    onClick={() =>
                      window.open(selectedRecord.documento, "_blank")
                    }
                    className="px-4 py-2 bg-[#56242A] text-white rounded-lg hover:bg-[#691B31] transition duration-300 transform hover:scale-105 focus:ring-2 focus:ring-[#691B31] "
                  >
                    DOCUMENTO
                  </button>
                </div>
              )}

            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 bg-[#BC995B] text-white rounded-lg hover:bg-[#A87F50] transform hover:scale-105 focus:ring-2 focus:ring-[#A87F50]"
              >
                Cerrar
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modal para mostrar la respuesta */}
{isResponseModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[50]">
    <motion.div
      className="bg-white rounded-lg w-full max-w-2xl p-6 relative flex"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 25,
        duration: 0.5,
      }}
    >
      {/* Botón de cerrar con ícono */}
      <button
        onClick={closeResponseModal}
        className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 transition-transform transform hover:scale-110"
      >
        <X size={24} />
      </button>

      <div className="w-2/3 pr-6">
        {/* Lado izquierdo para la respuesta */}
        <h2 className="text-2xl font-bold mb-4 text-[#691B31]">Respuesta</h2>
        {loadingResponse ? (
          <p>Cargando respuesta...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : responseDetails ? (
          <div>
            <p className="text-lg mb-4">
              <span className="font-bold">Mensaje:</span> {responseDetails.mensaje}
            </p>
            {responseDetails.documentoRespuesta && (
              <div className="mt-4">
                <button
                  onClick={() =>
                    
                    window.open(responseDetails.documentoRespuesta, "_blank")
                  }
                  className="px-4 py-2 bg-[#56242A] text-white rounded-lg hover:bg-[#691B31] transition duration-300 transform hover:scale-105 focus:ring-2 focus:ring-[#691B31]"
                >
                  Ver Documento de Respuesta
                </button>
              </div>
            )}
          </div>
        ) : (
          <p>No se encontró una respuesta para este registro.</p>
        )}
      </div>

      {/* Lado derecho para la imagen */}
      <div className="w-1/3 flex justify-center">
        <img
          src="/images/Respuesta.png"
          alt="Respuesta"
          className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
        />
      </div>
    </motion.div>
  </div>
)}
    </div>
  );
};

export default DetalleModal;
