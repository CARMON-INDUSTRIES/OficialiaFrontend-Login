"use client";
import React, { useState, useEffect } from "react";
import { FaFileAlt } from "react-icons/fa";

const Formulario = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  useEffect(() => {
    const inputFieldClass =
      "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#691B31]";
    const style = document.createElement("style");
    style.innerHTML = `.input-field { ${inputFieldClass} }`;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-[#ffffff] to-[#691B31] m-0 p-0">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-xl p-6"> {/* Cambiado max-w-md a max-w-lg */}
        {/* Encabezado con imagen de fondo */}
        <div
          className="relative w-full h-24 bg-cover bg-center rounded-t-lg"
          style={{
            backgroundImage: "url('/images/fondo.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "120px",
          }}
        >
          <div className="absolute inset-y-0 right-4 flex justify-center items-center">
            <div className="bg-white p-3 rounded-full shadow-lg">
              <FaFileAlt className="text-4xl text-[#691B31]" />
            </div>
          </div>
        </div>

        {/* Título */}
        <h2 className="text-2xl font-bold text-[#691B31] text-center mt-4">REGISTRAR DOCUMENTOS</h2>

        {/* Formulario */}
        <form className="mt-8 grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-bold mb-2" htmlFor="folio">Folio</label>
            <input
              type="text"
              id="folio"
              placeholder="Folio"
              className="w-full p-2 border rounded border-[#691B31]"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2" htmlFor="fechaDocumento">Fecha documento</label>
            <input
              type="date"
              id="fechaDocumento"
              placeholder="Fecha"
              className="w-full p-2 border rounded border-[#691B31]"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2" htmlFor="dependencia">Dependencia</label>
            <select
              id="dependencia"
              className="w-full p-2 border rounded border-[#691B31]"
            >
              <option>Seleccionar Dependencia</option>
              <option>Recursos Humanos</option>
              <option>Finanzas</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2" htmlFor="comunidad">Comunidad</label>
            <select
              id="comunidad"
              className="w-full p-2 border rounded border-[#691B31]"
            >
              <option>Seleccionar Comunidad</option>
              <option>Comunidad A</option>
              <option>Comunidad B</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2" htmlFor="remitente">Remitente</label>
            <input
              type="text"
              id="remitente"
              placeholder="Remitente"
              className="w-full p-2 border rounded border-[#691B31]"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2" htmlFor="solicitante">Solicitante</label>
            <input
              type="text"
              id="solicitante"
              placeholder="Solicitante"
              className="w-full p-2 border rounded border-[#691B31]"
            />
          </div>

          {/* Subida de Documentos */}
          <div className="border p-2 rounded border-[#691B31] text-center col-span-2">
            <input type="file" onChange={handleFileChange} className="hidden" id="fileInput" />
            <label htmlFor="fileInput" className="cursor-pointer text-[#691B31] font-semibold">Subir Documento</label>
            {selectedFile && <p className="text-sm mt-2">{selectedFile.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold mb-2" htmlFor="areaDestino">Área de Destino</label>
            <select
              id="areaDestino"
              className="w-full p-2 border rounded border-[#691B31]"
            >
              <option>Seleccionar Área de Destino</option>
              <option>Área 1</option>
              <option>Área 2</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2" htmlFor="fechaRegistro">Fecha de Registro</label>
            <input
              type="date"
              id="fechaRegistro"
              placeholder="Fecha de Registro"
              className="w-full p-2 border rounded border-[#691B31]"
            />
          </div>

          <button className="w-full bg-[#691B31] text-white p-2 rounded-xl col-span-2 mt-4">
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Formulario;


