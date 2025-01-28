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

    // Limpieza (opcional)
    return () => {
      document.head.removeChild(style);
    };
  }, []); // Este effect solo se ejecuta una vez, después de montar el componente en el navegador

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-[#ffffff] to-[#691B31]">
      <div className="bg-white shadow-lg rounded-lg w-[600px] p-6 relative"> {/* Aumenté el ancho aquí */}
        {/* Encabezado con imagen de fondo */}
        <div
          className="relative w-full h-24 bg-cover bg-center rounded-t-lg"
          style={{
            backgroundImage: "url('/images/fondo.jpg')", // Ruta correcta para la imagen
            backgroundSize: "cover", // Asegura que la imagen cubra el área
            backgroundPosition: "center", // Centra la imagen
            height: "120px", // Define la altura que quieres para la imagen
          }}
        >
          <div className="absolute inset-y-0 right-4 flex justify-center items-center">
            <div className="bg-white p-3 rounded-full shadow-lg">
              <FaFileAlt className="text-4xl text-[#691B31]" />
            </div>
          </div>
        </div>

        {/* Título */}
        <h2 className="text-2xl font-bold text-[#691B31] text-center mt-4 border-[#691B31]">REGISTRAR DOCUMENTOS</h2>

        {/* Formulario */}
        <form className="mt-8 grid grid-cols-2 gap-4">
          <input type="text" placeholder="Folio" className="w-full p-2 border rounded border-[#691B31]" />
          <input type="date" placeholder="Fecha" className="w-full p-2 border rounded border-[#691B31]" />
          <select className="w-full p-2 border rounded border-[#691B31]">
            <option>Seleccionar Dependencia</option>
            <option>Recursos Humanos</option>
            <option>Finanzas</option>
          </select>
          <select className="w-full p-2 border rounded border-[#691B31]">
            <option>Seleccionar Comunidad</option>
            <option>Comunidad A</option>
            <option>Comunidad B</option>
          </select>
          <input type="text" placeholder="Remitente" className="w-full p-2 border rounded border-[#691B31]" />
          <input type="text" placeholder="Solicitante" className="w-full p-2 border rounded border-[#691B31]" />
          
          {/* Subida de Documentos */}
          <div className="border p-2 rounded border-[#691B31] text-center col-span-2">
            <input type="file" onChange={handleFileChange} className="hidden" id="fileInput" />
            <label htmlFor="fileInput" className="cursor-pointer text-[#691B31] font-semibold">Subir Documento</label>
            {selectedFile && <p className="text-sm mt-2">{selectedFile.name}</p>}
          </div>
          
          {/* Áreas Destino (Combo Box) */}
          <select className="w-full p-2 border rounded border-[#691B31]">
            <option>Seleccionar Área de Destino</option>
            <option>Área 1</option>
            <option>Área 2</option>
          </select>

          <button className="w-full bg-[#691B31]  text-white p-2 rounded-xl col-span-2">Registrar</button>
        </form>
      </div>
    </div>
  );
};

export default Formulario;
