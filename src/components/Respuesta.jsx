"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Respuesta({ selectedRecord, closeModal }) {
  const [mensaje, setMensaje] = useState("");
  const [archivo, setArchivo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [downloadURL, setDownloadURL] = useState("");

  // Manejar la selección del archivo
  const handleFileChange = (event) => {
    setArchivo(event.target.files[0]);
  };

  // Subir archivo a Cloudinary
  const handleUpload = async () => {
    if (!archivo) {
      Swal.fire({
        icon: "warning",
        title: "Archivo no seleccionado",
        text: "Por favor selecciona un archivo antes de subirlo.",
      });
      return;
    }

    const formDataUpload = new FormData();
    formDataUpload.append("file", archivo);
    formDataUpload.append("upload_preset", "oficialia");
    formDataUpload.append("resource_type", "raw");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dwb98hqdy/upload`,
        {
          method: "POST",
          body: formDataUpload,
        }
      );

      const data = await response.json();

      if (data.secure_url) {
        setDownloadURL(data.secure_url);
        Swal.fire({
          icon: "success",
          title: "Archivo subido",
          text: "El archivo se ha subido correctamente.",
        });
      }
    } catch (error) {
      console.error("Error al subir el archivo:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al subir el archivo.",
      });
    }
  };

  // Enviar respuesta con mensaje y URL del documento
  const enviarRespuesta = async () => {
    if (!mensaje.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Campo vacío",
        text: "El mensaje no puede estar vacío.",
      });
      return;
    }

    setLoading(true);

    const respuestaData = {
      mensaje,
      documentoRespuesta: downloadURL || "", // URL del documento si existe
      respuestaCorrecta: selectedRecord.id,
    };

    try {
      const response = await fetch(
        "https://oficialialoginbackend.somee.com/api/Respuesta/responder",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(respuestaData),
        }
      );

      if (!response.ok) {
        throw new Error("Error al enviar la respuesta.");
      }

      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: "Respuesta enviada correctamente.",
        timer: 2000,
        showConfirmButton: false,
      });
      closeModal();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Hubo un error al enviar la respuesta.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div className="bg-white p-6 rounded-lg shadow-lg w-[450px] relative">
        <div className="flex justify-center mb-4">
          <img src="/images/Respuesta.png" alt="Respuesta" className="w-24 h-24 object-contain" />
        </div>

        <h2 className="text-2xl text-center text-[#691B31] font-bold mb-4">RESPUESTA</h2>
        <div className="bg-gray-100 p-4 rounded-md mb-4">
          <p><strong>📩 Remitente:</strong> {selectedRecord.remitente}</p>
          <p><strong>📌 Asunto:</strong> {selectedRecord.asunto}</p>
          <p><strong>📅 Fecha:</strong> {selectedRecord.fecha}</p>
          <p><strong>📜 Status:</strong> {selectedRecord.statusDescripcion}</p>
        </div>

        <label className="text-black font-semibold">✍️ Mensaje:</label>
        <textarea
          className="w-full p-2 border rounded mt-2 focus:ring-2 focus:ring-[#691B31]"
          placeholder="Escribe tu respuesta..."
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
        ></textarea>

        <label className="block text-black font-semibold mt-4">📂 Adjuntar documento:</label>
        <div className="flex items-center gap-4">
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border rounded cursor-pointer bg-gray-100 hover:bg-gray-200"
          />
          <button
            type="button"
            onClick={handleUpload}
            className="px-4 py-2 bg-[#BC995B] text-white font-semibold rounded-lg shadow-md hover:bg-[#A87F50]"
          >
            Subir
          </button>
        </div>

        {downloadURL && (
          <p className="text-sm font-semibold text-gray-700 mt-2">
            Archivo subido: <a href={downloadURL} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-bold">Ver documento</a>
          </p>
        )}

        <div className="flex gap-4 mt-6 justify-center">
          <button className="bg-red-500 text-white px-5 py-2 rounded" onClick={closeModal} disabled={loading}>
            Cancelar
          </button>
          <button className="bg-green-500 text-white px-5 py-2 rounded" onClick={enviarRespuesta} disabled={loading}>
            {loading ? "Enviando..." : "Enviar"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
