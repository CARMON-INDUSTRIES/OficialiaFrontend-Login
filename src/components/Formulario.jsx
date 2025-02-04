"use client";
import React, { useState } from "react";
import { FaFileAlt } from "react-icons/fa";
import Select from "react-select";

const token = localStorage.getItem("token");
const userRole = token ? JSON.parse(atob(token.split(".")[1])).role : null;

if (!token) {
  // Redirigir a login si no hay sesión iniciada
  window.location.href = "/login";
}

if (userRole !== "User") {
  // Redirigir si no es administrador
  window.location.href = "/unauthorized";
}

const options = [
  { value: "area1", label: "Presidente municipal" },
  { value: "area2", label: "Secretaria general" },
  { value: "area3", label: "Oficialia Mayor" },
];

const Formulario = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [areasDestino, setAreasDestino] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleViewFile = () => {
    if (selectedFile) {
      const fileURL = URL.createObjectURL(selectedFile);
      window.open(fileURL, "_blank");
    }
  };

  return (
    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-[#ffffff] to-[#691B31] p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-5xl p-6">
        {/* Encabezado */}
        <div
          className="relative w-full h-24 bg-cover bg-center rounded-t-lg"
          style={{ backgroundImage: "url('/images/fondo.jpg')" }}
        >
          <div className="absolute inset-y-0 right-4 flex justify-center items-center">
            <div className="bg-white p-3 rounded-full shadow-lg">
              <FaFileAlt className="text-4xl text-[#691B31]" />
            </div>
          </div>
        </div>

        {/*Tituloo */}
        <h2 className="text-2xl font-bold text-[#691B31] text-center mt-4">REGISTRAR DOCUMENTOS</h2>

        {/* Formulario */}
        <form className="mt-8 grid grid-cols-3 gap-4">
          <div>
            <label className="block font-bold">Folio</label>
            <input type="text" placeholder="Folio" className="w-full p-2 border rounded border-[#691B31]" />
          </div>
          <div>
            <label className="block font-bold">Fecha de Registro</label>
            <input type="date" className="w-full p-2 border rounded border-[#691B31]" />
          </div>
          <div>
            <label className="block font-bold">Dependencia</label>
            <select className="w-full p-2 border rounded border-[#691B31]">
              <option>Seleccionar Dependencia</option>
              <option>Recursos Humanos</option>
              <option>Finanzas</option>
            </select>
          </div>
          <div>
            <label className="block font-bold">Comunidad</label>
            <select className="w-full p-2 border rounded border-[#691B31]">
              <option>Seleccionar Comunidad</option>
              <option>Comunidad A</option>
              <option>Comunidad B</option>
            </select>
          </div>
          <div>
            <label className="block font-bold">Remitente</label>
            <input type="text" placeholder="Remitente" className="w-full p-2 border rounded border-[#691B31]" />
          </div>
          <div>
            <label className="block font-bold">Cargo del Remitente</label>
            <input type="text" placeholder="Cargo" className="w-full p-2 border rounded border-[#691B31]" />
          </div>
          <div>
            <label className="block font-bold">Destinatario</label>
            <input type="text" placeholder="Nombre del destinatario" className="w-full p-2 border rounded border-[#691B31]" />
          </div>
          <div>
            <label className="block font-bold">Cargo del Destinatario</label>
            <input type="text" placeholder="Cargo" className="w-full p-2 border rounded border-[#691B31]" />
          </div>
          <div>
            <label className="block font-bold">Asunto</label>
            <input type="text" placeholder="Asunto o descripción" className="w-full p-2 border rounded border-[#691B31]" />
          </div>
          
          {/* Importancia y Multi-Select Dropdown */}
          <div className="col-span-2">
            <label className="block font-bold">Área de Destino</label>
            <Select
              options={options}
              isMulti
              value={areasDestino}
              onChange={setAreasDestino}
              className="w-full border border-[#691B31] rounded-lg"
            />
          </div>
          <div>
            <label className="block font-bold">Importancia</label>
            <select className="w-full p-2 border rounded border-[#691B31]">
              <option>Seleccionar Prioridad</option>
              <option>Urgente</option>
              <option>Medio</option>
              <option>Normal</option>
              <option>Informativo</option>
            </select>
          </div>

          {/* Subida de Documento */}
          <div className="col-span-3 border p-2 rounded border-[#691B31] text-center">
            <input type="file" onChange={handleFileChange} className="hidden" id="fileInput" />
            <label htmlFor="fileInput" className="cursor-pointer text-[#691B31] font-semibold">
              Subir Documento Escaneado
            </label>
            {selectedFile && <p className="text-sm mt-2">{selectedFile.name}</p>}
            {selectedFile && (
              <button
                type="button"
                onClick={handleViewFile}
                className="ml-4 text-[#691B31] underline font-semibold"
              >
                Ver Documento
              </button>
            )}
          </div>

          {/* Botón de Registro */}
          <div className="col-span-3 flex justify-center">
            <button className="bg-[#691B31] text-white px-6 py-2 rounded-lg hover:bg-[#A87F50]">
              Registrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Formulario;
