"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const DetalleNotificacion = ({ selectedRecord, closeModal }) => {
  const [comunidad, setComunidad] = useState("");
  const [area, setArea] = useState("");
  const [importancia, setImportancia] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      if (!selectedRecord) return;

      const token = localStorage.getItem("token");
      try {
        const [comResp, areaResp, impResp, statusResp] = await Promise.all([
          axios.get(
            "https://oficialialoginbackend.somee.com/api/Correspondencia/obtener-comunidades",
            { headers: { Authorization: `Bearer ${token}` } }
          ),
          axios.get(
            "https://oficialialoginbackend.somee.com/api/Correspondencia/obtener-areas",
            { headers: { Authorization: `Bearer ${token}` } }
          ),
          axios.get(
            "https://oficialialoginbackend.somee.com/api/Correspondencia/obtener-importancia",
            { headers: { Authorization: `Bearer ${token}` } }
          ),
          axios.get(
            "https://oficialialoginbackend.somee.com/api/Correspondencia/obtener-status",
            { headers: { Authorization: `Bearer ${token}` } }
          ),
        ]);

        setComunidad(
          comResp.data.find((c) => c.id === selectedRecord.comunidadId)?.nombre || "N/A"
        );
        setArea(
          areaResp.data.find((a) => a.id === selectedRecord.areaId)?.nombre || "N/A"
        );
        setImportancia(
          impResp.data.find((i) => i.id === selectedRecord.importanciaId)?.descripcion || "N/A"
        );
        setStatus(
          statusResp.data.find((s) => s.id === selectedRecord.statusId)?.descripcion || "N/A"
        );
      } catch (error) {
        console.error("Error al obtener detalles adicionales:", error);
      }
    };

    fetchDetails();
  }, [selectedRecord]);

  if (!selectedRecord) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[50]">
      <motion.div
        className="bg-white rounded-lg w-full max-w-4xl md:max-w-2xl lg:max-w-3xl flex flex-col md:flex-row overflow-hidden"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ type: "spring", stiffness: 100, damping: 15, duration: 0.5 }}
      >
        <div className="w-full md:w-1/3">
          <img
            src="/images/notificacionImagen.jpeg"
            alt="Notificación"
            className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
          />
        </div>

        <div className="w-full md:w-2/3 p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-[#691B31]">Detalles de la Notificación</h2>
            <p className="text-lg mb-2"><span className="font-bold">Folio:</span> {selectedRecord.folio}</p>
            <p className="text-lg mb-2"><span className="font-bold">Fecha:</span> {new Date(selectedRecord.fecha).toLocaleDateString("es-MX")}</p>
            <p className="text-lg mb-2"><span className="font-bold">Dependencia:</span> {selectedRecord.dependencia}</p>
            <p className="text-lg mb-2"><span className="font-bold">Comunidad:</span> {comunidad}</p>
            <p className="text-lg mb-2"><span className="font-bold">Remitente:</span> {selectedRecord.remitente}</p>
            <p className="text-lg mb-2"><span className="font-bold">Cargo Remitente:</span> {selectedRecord.cargoRemitente}</p>
            <p className="text-lg mb-2"><span className="font-bold">Asunto:</span> {selectedRecord.asunto}</p>
            <p className="text-lg mb-2"><span className="font-bold">Destinatario:</span> {selectedRecord.destinatario}</p>
            <p className="text-lg mb-2"><span className="font-bold">Cargo Destinatario:</span> {selectedRecord.cargoDestinatario}</p>
            <p className="text-lg mb-2"><span className="font-bold">Área(s) turnada(s):</span> {area}</p>
            <p className="text-lg mb-2"><span className="font-bold text-red-600">Importancia:</span> {importancia}</p>
            <p className="text-lg mb-2"><span className="font-bold text-[#621132]">Status:</span> {status}</p>
          </div>

          {selectedRecord?.documento && selectedRecord.documento.endsWith(".pdf") && (
            <div className="mt-4">
              <button
                onClick={() => window.open(selectedRecord.documento, "_blank")}
                className="px-4 py-2 bg-[#56242A] text-white rounded-lg hover:bg-[#691B31] transition duration-300 transform hover:scale-105 focus:ring-2 focus:ring-[#691B31]"
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

export default DetalleNotificacion;
