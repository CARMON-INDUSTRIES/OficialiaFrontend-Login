"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Respuesta({ id, onClose }) {
  const [registro, setRegistro] = useState(null);
  const [estado, setEstado] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [documento, setDocumento] = useState(null);

  useEffect(() => {
    // Lógica para obtener el registro de notificación por ID (puedes modificar esta parte según tu API)
    const fetchRegistro = async () => {
      try {
        const response = await fetch(`https://oficialialoginbackend.somee.com/api/Correspondencia/obtener`);
        if (!response.ok) throw new Error("Error al obtener el registro");

        const data = await response.json();
        const notif = data[0]; // Suponiendo que la respuesta es un array
        setRegistro(notif);
        setEstado(notif.status);
      } catch (error) {
        console.error("Error al obtener el registro:", error);
      }
    };

    fetchRegistro();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Aquí agregarías la lógica para enviar la respuesta
    console.log("Enviando respuesta:", { estado, mensaje, documento });

    // Cerrar el modal después de enviar la respuesta
    onClose();
  };

  if (!registro) return null; // Si no hay registro aún, no renderiza el modal

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        exit={{ y: -50 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-[#691B31] text-center mb-4">RESPUESTA</h2>

        <form onSubmit={handleSubmit}>
          {/* Datos de la notificación */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-lg font-bold">Remitente:</p>
              <p className="text-[#691B31]">{registro.remitente}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-lg font-bold">Asunto:</p>
              <p className="text-[#691B31]">{registro.asunto}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-lg font-bold">Fecha:</p>
              <p className="text-[#691B31]">{new Date(registro.fecha).toLocaleDateString("es-MX")}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-lg font-bold">Estado:</p>
              <select
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                className="border p-2 rounded-md"
              >
                <option value="registrado">Registrado</option>
                <option value="entregado">Entregado</option>
                <option value="leido">Leído</option>
                <option value="en proceso">En Proceso</option>
                <option value="finalizado">Finalizado</option>
              </select>
            </div>
          </div>

          {/* Mensaje de respuesta */}
          <div className="my-4 border-collapse">
            <label htmlFor="mensaje" className="block text-lg font-bold">Mensaje de respuesta:</label>
            <textarea
              id="mensaje"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              className="w-full p-2 mt-2 border rounded-md"
              rows="4"
              placeholder="Escribe tu mensaje aquí..."
            />
          </div>

          {/* Documento de respuesta */}
          <div className="my-4">
            <label htmlFor="documento" className="block text-lg font-bold">Adjuntar Documento:</label>
            <input
              type="file"
              id="documento"
              onChange={(e) => setDocumento(e.target.files[0])}
              className="w-full p-2 mt-2 border rounded-md"
            />
          </div>

          {/* Botones de acción */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
            >
              Enviar Respuesta
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
