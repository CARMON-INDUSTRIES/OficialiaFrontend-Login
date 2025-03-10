import { motion } from "framer-motion";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Respuesta({ selectedRecord, closeModal }) {
  const [mensaje, setMensaje] = useState("");
  const [archivo, setArchivo] = useState(null);
  const [loading, setLoading] = useState(false); // Para indicar que está enviando

  // Función para convertir el archivo a Base64
  const convertirArchivoBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]); // Extraer solo el Base64
      reader.onerror = (error) => reject(error);
    });
  };

  // Función para enviar la respuesta
  const enviarRespuesta = async () => {
    if (!mensaje.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Campo vacío",
        text: "El mensaje no puede estar vacío.",
      });
      return;
    }

    setLoading(true); // Activar loading mientras se envía

    let documentoBase64 = "";
    if (archivo) {
      try {
        documentoBase64 = await convertirArchivoBase64(archivo);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error al procesar el archivo.",
        });
        setLoading(false);
        return;
      }
    }

    const respuestaData = {
      mensaje,
      documentoRespuesta: documentoBase64 || "", // Si no hay archivo, enviamos string vacío
      respuestaCorrecta: selectedRecord.id, // Aquí pasamos el ID del registro
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
      closeModal(); // Cerrar el modal después de enviar
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Hubo un error al enviar la respuesta.",
      });
    } finally {
      setLoading(false); // Desactivar loading
    }
  };

  return (
    <motion.div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div
        className="bg-white p-6 rounded-lg shadow-lg w-[450px] relative"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Imagen decorativa en la parte superior */}
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
        <input
          type="file"
          className="w-full mt-2 border p-2 rounded cursor-pointer bg-gray-100 hover:bg-gray-200"
          onChange={(e) => setArchivo(e.target.files[0])}
        />

        <div className="flex gap-4 mt-6 justify-center">
          <button
            className="bg-red-500 text-white px-5 py-2 rounded transition duration-300 transform hover:scale-105 focus:ring-2 focus:ring-red-700"
            onClick={closeModal}
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            className="bg-green-500 text-white px-5 py-2 rounded transition duration-300 transform hover:scale-105 focus:ring-2 focus:ring-green-700"
            onClick={enviarRespuesta}
            disabled={loading}
          >
            {loading ? "Enviando..." : "Enviar"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
