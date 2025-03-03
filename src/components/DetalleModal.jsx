"use client";

import React from "react";
import { motion } from "framer-motion";

const DetalleModal = ({ selectedRecord, closeModal }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[50]">
      <motion.div
        className="bg-white rounded-lg w-full max-w-4xl md:max-w-2xl lg:max-w-3xl flex flex-col md:flex-row overflow-hidden"
        initial={{ opacity: 0, y: -50 }} // Empieza arriba
        animate={{ opacity: 1, y: 0 }} // Mueve hacia la posición original
        exit={{ opacity: 0, y: 50 }} // Cuando se cierre, mueve hacia abajo
        transition={{
          type: "spring", // Para el efecto de rebote
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
              <span className="font-bold">Asunto:</span> {selectedRecord.asunto}
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
              <span className="font-bold text-[#621132]">Status:</span>{" "}
              {selectedRecord.statusDescripcion}
            </p>
          </div>
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
                  Ver Documento
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
  );
};

export default DetalleModal;
  