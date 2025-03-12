"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";

export default function Respuesta({ selectedRecord, closeModal }) {
  const [mensaje, setMensaje] = useState("");
  const [archivo, setArchivo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [downloadURL, setDownloadURL] = useState("");
  const [statusOptions, setStatusOptions] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null); // Estado para almacenar el estado seleccionado

// Inicializar el estado seleccionado con el estado actual del registro
useEffect(() => {
  if (selectedRecord && selectedRecord.idStatus) {
    setSelectedStatus(selectedRecord.idStatus);
  }
}, [selectedRecord]);

// Obtener las opciones de status
useEffect(() => {
  const fetchStatusOptions = async () => {
    const token = localStorage.getItem("token"); // Asegúrate de que el token esté disponible

    try {
      const response = await axios.get(
        "https://oficialialoginbackend.somee.com/api/Correspondencia/obtener-status",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Opciones de status obtenidas:", response.data);
      setStatusOptions(response.data); // Asumiendo que la respuesta contiene los estados
    } catch (error) {
      console.error("Error al obtener las opciones de status:", error.response || error.message);
      Swal.fire({
        icon: "error",
        title: "Error al cargar las opciones de status",
        text: error.response ? error.response.data.message : error.message,
      });
    }
  };

  fetchStatusOptions();
}, []);

/// Actualizar el estado
const handleChangeStatus = async () => {
  if (!selectedStatus) {
    Swal.fire({
      icon: "warning",
      title: "Selección de status vacía",
      text: "Por favor, seleccione un status antes de cambiarlo.",
    });
    return;
  }

  const token = localStorage.getItem("token");

  try {
    const response = await axios.put(
      `https://oficialialoginbackend.somee.com/api/Correspondencia/actualizar-estado/${selectedRecord.id}`,
      { Status: selectedStatus },  // Asegúrate de enviar idStatus en el body
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    Swal.fire({
      icon: "success",
      title: "Estado actualizado",
      text: "El estado se ha actualizado correctamente.",
      confirmButtonColor: "#691B31",
    });

    closeModal(); // Cerrar el modal después de guardar los cambios
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "¡Error!",
      text: "Hubo un problema al actualizar el estado.",
      confirmButtonColor: "#691B31",
    });
  }
};
  
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

  // Enviar respuesta con mensaje, URL del documento y status
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
          <img
            src="/images/Respuesta.png"
            alt="Respuesta"
            className="mx-auto w-24 h-24 object-contain"
          />
        </div>

        <h2 className="text-2xl text-center text-[#691B31] font-bold">
          RESPUESTA
        </h2>
        <div className="bg-gray-100 p-4 rounded-md">
          <p><strong> Remitente:</strong> {selectedRecord.remitente}</p>
          <p><strong> Asunto:</strong> {selectedRecord.asunto}</p>
          <p><strong> Fecha:</strong> {selectedRecord.fecha}</p>
          <p><strong> Estatus Actual:</strong> {selectedRecord.statusDescripcion}</p>
        </div>

    {/* Status - Dropdown */}
    <div className="space-y-2">
          <label className="block text-gray-700 font-bold ">Cambiar estatus</label>
          <div className="flex gap-2">
            <select
              className="flex-grow p-2 border rounded border-[#691B31] bg-white"
              value={selectedStatus || ""}
              onChange={(e) => setSelectedStatus(Number(e.target.value))}
            >
              <option value="" disabled>Selecciona un estado</option>
              {statusOptions.map((status) => (
                <option key={status.idStatus} value={status.idStatus}>{status.estado}</option>
              ))}
            </select>
            <button
              className="px-3 bg-blue-500 text-white text-sm font-semibold rounded-lg transition duration-200 transform hover:scale-105 focus:ring-2 focus:ring-blue-700"
              onClick={handleChangeStatus}
            >Guardar</button>
          </div>
        </div>
<br></br>
        <label className="text-black font-semibold mt-4">✍️ Mensaje:</label>
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
            className="px-4 py-2 bg-[#BC995B] text-white font-semibold rounded-lg shadow-md transition duration-200 transform hover:scale-105 focus:ring-2 focus:ring-[#A87F50]"
          >
            Subir
          </button>
        </div>

        {downloadURL && (
          <p className="text-sm font-semibold text-gray-700 mt-2">
            Archivo subido:{" "}
            <a
              href={downloadURL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 font-bold"
            >
              Ver documento
            </a>
          </p>
        )}

        <div className="flex gap-4 mt-6 justify-center">
          <button
            className="bg-red-500 text-white px-5 py-2 rounded transition duration-200 transform hover:scale-105 focus:ring-2 focus:ring-red-700"
            onClick={closeModal}
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            className="bg-green-500 text-white px-5 py-2 rounded transition duration-200 transform hover:scale-105 focus:ring-2 focus:ring-green-700"
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
