"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaFileAlt } from "react-icons/fa";
import { UploadButton } from "@/components/ui/upload-button";
import Select from "react-select";
import axios from "axios";
import Swal from "sweetalert2";

const Formulario = () => {
  const router = useRouter();
  const [isRotating, setIsRotating] = useState(true);
  const [areasDestino, setAreasDestino] = useState([]);
  const [comunidades, setComunidades] = useState([]);
  const [importancia, setImportancias] = useState([]);
  const [area, setAreas] = useState([]);
  const [status, setStatus] = useState([]);

  const [formData, setFormData] = useState({
    folio: "",
    fecha: "",
    dependencia: "",
    comunidad: "",
    remitente: "",
    cargoRemitente: "",
    destinatario: "",
    cargoDestinatario: "",
    asunto: "",
    areaDestino: [],
    importancia: "",
    status: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }

    const fetchData = async () => {
      try {
        const [comResp, areasResp, impResp, statusResp] = await Promise.all([
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

        setComunidades(comResp.data);
        setAreas(areasResp.data);
        setImportancias(impResp.data);
        setStatus(statusResp.data);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();

    // Detener la animación después de 1 segundo
    const timeout = setTimeout(() => {
      setIsRotating(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (selectedOptions, field) => {
    setFormData({
      ...formData,
      [field]: selectedOptions.map((option) => option.value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "https://oficialialoginbackend.somee.com/api/Correspondencia/registrar",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Registros exitosos:", response.data);
      Swal.fire({
        title: "¡Éxito!",
        text: "Documento registrado correctamente",
        icon: "success",
        confirmButtonColor: "#691B31",
      });
      router.replace("/consulta"); // Redirige tras el registro
    } catch (error) {
      console.error("Error al registrar:", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un error al registrar el documento",
        icon: "error",
        confirmButtonColor: "#691B31",
      });
    }
  };

  const areaOptions = area.map((com) => ({
    value: com.idArea,
    label: com.nombreArea,
  }));

  return (
    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-[#ffffff] to-[#691B31] p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-5xl p-6">
        <div
          className="relative w-full h-24 bg-cover bg-center rounded-t-lg"
          style={{ backgroundImage: "url('/images/fondo.jpg')" }}
        >
          <div className="absolute inset-y-0 right-4 flex justify-center items-center">
            <h2 className="text-2xl font-bold text-[#691B31] text-center mt-4">
              REGISTRAR DOCUMENTOS ㅤㅤ
            </h2>

            <div className="bg-white p-3 rounded-full shadow-lg">
              <FaFileAlt
                className={`text-4xl text-[#691B31] ${
                  isRotating ? "animate-spin" : ""
                }`}
              />
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-3 gap-4">
          <input
            type="text"
            name="documento"
            placeholder="Documento"
            onChange={handleChange}
            className="w-full p-2 border rounded border-[#691B31]"
          />

          <div>
            <label className="block font-bold">Folio</label>
            <input
              type="text"
              name="folio"
              onChange={handleChange}
              placeholder="Folio"
              className="w-full p-2 border rounded border-[#691B31]"
            />
          </div>
          <div>
            <label className="block font-bold">Fecha de Registro</label>
            <input
              type="date"
              name="fecha"
              onChange={handleChange}
              className="w-full p-2 border rounded border-[#691B31]"
            />
          </div>
          <div>
            <label className="block font-bold">Dependencia</label>
            <input
              type="text"
              name="dependencia"
              onChange={handleChange}
              placeholder="Dependencia remitente"
              className="w-full p-2 border rounded border-[#691B31]"
            />
          </div>
          <div>
            <label className="block font-bold">Comunidades</label>
            <select
              name="comunidad"
              onChange={handleChange}
              className="w-full p-2 border rounded border-[#691B31]"
            >
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
              name="remitente"
              onChange={handleChange}
              placeholder="Remitente"
              className="w-full p-2 border rounded border-[#691B31]"
            />
          </div>
          <div>
            <label className="block font-bold">Cargo del Remitente</label>
            <input
              type="text"
              name="cargoRemitente"
              onChange={handleChange}
              placeholder="Cargo"
              className="w-full p-2 border rounded border-[#691B31]"
            />
          </div>
          <div>
            <label className="block font-bold">Destinatario</label>
            <input
              type="text"
              name="destinatario"
              onChange={handleChange}
              placeholder="Nombre del destinatario"
              className="w-full p-2 border rounded border-[#691B31]"
            />
          </div>
          <div>
            <label className="block font-bold">Cargo del Destinatario</label>
            <input
              type="text"
              name="cargoDestinatario"
              onChange={handleChange}
              placeholder="Cargo"
              className="w-full p-2 border rounded border-[#691B31]"
            />
          </div>
          <div>
            <label className="block font-bold">Asunto</label>
            <input
              type="text"
              name="asunto"
              onChange={handleChange}
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
              onChange={(selected) => handleSelectChange(selected, "area")}
              className="w-full border border-[#691B31] rounded-lg"
            />
          </div>
          <div>
            <label className="block font-bold">Importancia</label>
            <select
              onChange={handleChange}
              name="importancia"
              className="w-full p-2 border rounded border-[#691B31]"
            >
              <option>Seleccionar Importancia</option>
              {importancia.map((com) => (
                <option key={com.idImportancia} value={com.idImportancia}>
                  {com.nivel}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-bold">Status</label>
            <select
              onChange={handleChange}
              name="status"
              className="w-full p-2 border rounded border-[#691B31]"
            >
              <option>Seleccionar Status</option>
              {status.map((com) => (
                <option key={com.idStatus} value={com.idStatus}>
                  {com.estado}
                </option>
              ))}
            </select>
          </div>
          <div>
          <label className="block font-bold">Subir Archivo</label>
            <UploadButton
              route="demo"
              accept="application/pdf"
              onUploadComplete={({ file }) => {
                alert(`Uploaded ${file.name}`);
              }}
            />
          </div>
          <div className="col-span-3 flex justify-end items-end">
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
