"use client";
import React, { useState } from "react";
import { FaFileAlt } from "react-icons/fa";
import Select from "react-select";

const options = [
  { value: "area1", label: "Presidente municipal" },
  { value: "area2", label: "Secretaria general" },
  { value: "area3", label: "Oficialia Mayor" },
];

const Formulario = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [areasDestino, setAreasDestino] = useState([]);
  const [formData, setFormData] = useState({
    folio: "",
    fechaRegistro: "",
    dependencia: "",
    comunidad: "",
    remitente: "",
    cargoRemitente: "",
    destinatario: "",
    cargoDestinatario: "",
    asunto: "",
    importancia: "",
  });

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append("folio", formData.folio);
    data.append("fechaRegistro", formData.fechaRegistro);
    data.append("dependencia", formData.dependencia);
    data.append("comunidad", formData.comunidad);
    data.append("remitente", formData.remitente);
    data.append("cargoRemitente", formData.cargoRemitente);
    data.append("destinatario", formData.destinatario);
    data.append("cargoDestinatario", formData.cargoDestinatario);
    data.append("asunto", formData.asunto);
    data.append("importancia", formData.importancia);
    data.append("areasDestino", JSON.stringify(areasDestino.map((area) => area.value)));
    if (selectedFile) {
      data.append("archivo", selectedFile);
    }

    try {
      const response = await fetch("https://oficialialoginbackend.somee.com/api/Registros/Nuevo", {
        method: "POST",
        body: data,
      });

      if (!response.ok) throw new Error("Error en la solicitud");

      alert("Registro exitoso");
      setFormData({
        folio: "",
        fechaRegistro: "",
        dependencia: "",
        comunidad: "",
        remitente: "",
        cargoRemitente: "",
        destinatario: "",
        cargoDestinatario: "",
        asunto: "",
        importancia: "",
      });
      setSelectedFile(null);
      setAreasDestino([]);
    } catch (error) {
      console.error("Error al registrar:", error);
      alert("Error al registrar documento");
    }
  };

  return (
    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-[#ffffff] to-[#691B31] p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-5xl p-6">
        <div className="relative w-full h-24 bg-cover bg-center rounded-t-lg" style={{ backgroundImage: "url('/images/fondo.jpg')" }}>
          <div className="absolute inset-y-0 right-4 flex justify-center items-center">
            <div className="bg-white p-3 rounded-full shadow-lg">
              <FaFileAlt className="text-4xl text-[#691B31]" />
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-[#691B31] text-center mt-4">REGISTRAR DOCUMENTOS</h2>

        <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-3 gap-4">
          <input type="text" name="folio" placeholder="Folio" value={formData.folio} onChange={handleChange} className="w-full p-2 border rounded border-[#691B31]" />
          <input type="date" name="fechaRegistro" value={formData.fechaRegistro} onChange={handleChange} className="w-full p-2 border rounded border-[#691B31]" />
          <select name="dependencia" value={formData.dependencia} onChange={handleChange} className="w-full p-2 border rounded border-[#691B31]">
            <option value="">Seleccionar Dependencia</option>
            <option value="Recursos Humanos">Recursos Humanos</option>
            <option value="Finanzas">Finanzas</option>
          </select>
          <select name="comunidad" value={formData.comunidad} onChange={handleChange} className="w-full p-2 border rounded border-[#691B31]">
            <option value="">Seleccionar Comunidad</option>
            <option value="Comunidad A">Comunidad A</option>
            <option value="Comunidad B">Comunidad B</option>
          </select>
          <input type="text" name="remitente" placeholder="Remitente" value={formData.remitente} onChange={handleChange} className="w-full p-2 border rounded border-[#691B31]" />
          <input type="text" name="cargoRemitente" placeholder="Cargo" value={formData.cargoRemitente} onChange={handleChange} className="w-full p-2 border rounded border-[#691B31]" />
          <input type="text" name="destinatario" placeholder="Destinatario" value={formData.destinatario} onChange={handleChange} className="w-full p-2 border rounded border-[#691B31]" />
          <input type="text" name="cargoDestinatario" placeholder="Cargo" value={formData.cargoDestinatario} onChange={handleChange} className="w-full p-2 border rounded border-[#691B31]" />
          <input type="text" name="asunto" placeholder="Asunto o descripción" value={formData.asunto} onChange={handleChange} className="w-full p-2 border rounded border-[#691B31]" />
          
          <div className="col-span-2">
            <label className="block font-bold">Área de Destino</label>
            <Select options={options} isMulti value={areasDestino} onChange={setAreasDestino} className="w-full border border-[#691B31] rounded-lg" />
          </div>
          <select name="importancia" value={formData.importancia} onChange={handleChange} className="w-full p-2 border rounded border-[#691B31]">
            <option value="">Seleccionar Prioridad</option>
            <option value="Urgente">Urgente</option>
            <option value="Medio">Medio</option>
            <option value="Normal">Normal</option>
            <option value="Informativo">Informativo</option>
          </select>

          <div className="col-span-3 border p-2 rounded border-[#691B31] text-center">
            <input type="file" onChange={handleFileChange} className="hidden" id="fileInput" />
            <label htmlFor="fileInput" className="cursor-pointer text-[#691B31] font-semibold">Subir Documento Escaneado</label>
            {selectedFile && <p className="text-sm mt-2">{selectedFile.name}</p>}
            {selectedFile && <button type="button" onClick={handleViewFile} className="ml-4 text-[#691B31] underline font-semibold">Ver Documento</button>}
          </div>

          <div className="col-span-3 flex justify-center">
            <button type="submit" className="bg-[#691B31] text-white px-6 py-2 rounded-lg hover:bg-[#A87F50]">Registrar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Formulario;
