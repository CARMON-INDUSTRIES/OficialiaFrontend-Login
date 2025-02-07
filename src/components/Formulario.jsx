"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaFileAlt } from "react-icons/fa";
import Select from "react-select";
import axios from "axios";

const options = [
  { value: "area1", label: "Presidente municipal" },
  { value: "area2", label: "Secretaria general" },
  { value: "area3", label: "Oficialia Mayor" },
];

const Formulario = () => {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState(null);
  const [areasDestino, setAreasDestino] = useState([]);
  const [comunidades, setComunidades] = useState([]);
  const [area, setAreas] = useState([]);

  const areaOptions = area.map((com) => ({
    value: com.idArea,
    label: com.nombreArea,
  }));

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }

    const fetchComunidades = async () => {
      try {
        const response = await axios.get(
          "https://oficialialoginbackend.somee.com/api/Correspondencia/obtener-comunidades",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("Datos de comunidades:", response.data);
        setComunidades(response.data);
      } catch (error) {
        console.error("Error al obtener comunidades:", error);
      }
    };

    const fetchAreas = async () => {
      try {
        const response = await axios.get(
          "https://oficialialoginbackend.somee.com/api/Correspondencia/obtener-areas",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("Datos de areas:", response.data);
        setAreas(response.data);
      } catch (error) {
        console.error("Error al obtener areas:", error);
      }
    };

    fetchComunidades();
    fetchAreas();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleViewFile = () => {
    if (selectedFile) {
      const fileURL = URL.createObjectURL(selectedFile);
      window.open(fileURL, "_blank");
      setTimeout(() => URL.revokeObjectURL(fileURL), 100);
    }
  };

  return (
    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-[#ffffff] to-[#691B31] p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-5xl p-6">
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
        <h2 className="text-2xl font-bold text-[#691B31] text-center mt-4">
          REGISTRAR DOCUMENTOS
        </h2>
        <form className="mt-8 grid grid-cols-3 gap-4">
          <div>
            <label className="block font-bold">Folio</label>
            <input
              type="text"
              placeholder="Folio"
              className="w-full p-2 border rounded border-[#691B31]"
            />
          </div>
          <div>
            <label className="block font-bold">Fecha de Registro</label>
            <input
              type="date"
              className="w-full p-2 border rounded border-[#691B31]"
            />
          </div>
          <div>
            <label className="block font-bold">Dependencia</label>
            <input
              type="text"
              placeholder="Dependencia remitente"
              className="w-full p-2 border rounded border-[#691B31]"
            />
          </div>
          <div>
            <label className="block font-bold">Comunidad</label>
            <select className="w-full p-2 border rounded border-[#691B31]">
              <option>Seleccionar Comunidad</option>
              {comunidades.map((com) => (
                <option key={com.idComunidad} value={com.idComunidad}>
                  {com.nombreComunidad}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-bold">Remitente</label>
            <input
              type="text"
              placeholder="Remitente"
              className="w-full p-2 border rounded border-[#691B31]"
            />
          </div>
          <div>
            <label className="block font-bold">Cargo del Remitente</label>
            <input
              type="text"
              placeholder="Cargo"
              className="w-full p-2 border rounded border-[#691B31]"
            />
          </div>
          <div>
            <label className="block font-bold">Destinatario</label>
            <input
              type="text"
              placeholder="Nombre del destinatario"
              className="w-full p-2 border rounded border-[#691B31]"
            />
          </div>
          <div>
            <label className="block font-bold">Cargo del Destinatario</label>
            <input
              type="text"
              placeholder="Cargo"
              className="w-full p-2 border rounded border-[#691B31]"
            />
          </div>
          <div>
            <label className="block font-bold">Asunto</label>
            <input
              type="text"
              placeholder="Asunto o descripción"
              className="w-full p-2 border rounded border-[#691B31]"
            />
          </div>
          <div className="col-span-2">
            <label className="block font-bold">Área de Destino</label>
            <Select
              options={areaOptions}
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
          <div>
            <label className="block font-bold">Status</label>
            <select className="w-full p-2 border rounded border-[#691B31]">
              <option>Seleccionar Prioridad</option>
              <option>Urgente</option>
              <option>Medio</option>
              <option>Normal</option>
              <option>Informativo</option>
            </select>
          </div>
          <div className="col-span-3 border p-2 rounded border-[#691B31] text-center">
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              id="fileInput"
            />
            <label
              htmlFor="fileInput"
              className="cursor-pointer text-[#691B31] font-semibold"
            >
              Subir Documento Escaneado
            </label>
            {selectedFile && (
              <p className="text-sm mt-2">{selectedFile.name}</p>
            )}
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
