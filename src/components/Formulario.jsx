"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaFileAlt } from "react-icons/fa";
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
  const [file, setFile] = useState(null);
  const [downloadURL, setDownloadURL] = useState("");
  const [progress, setProgress] = useState(0);

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
    area: [],
    importancia: "",
    status: "",
    documento: "",
    fechaTerminacion: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  
    const randomFolio = Math.floor(10000 + Math.random() * 90000).toString();
    setFormData((prevData) => ({
      ...prevData,
      folio: randomFolio,
    }));
  
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
  
    const timeout = setTimeout(() => {
      setIsRotating(false);
    }, 1500);
  
    return () => clearTimeout(timeout);
  }, [router]); 
  

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append("file", file);
    formDataUpload.append("upload_preset", "oficialia"); // Ajusta tu preset en Cloudinary
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

        // ACTUALIZA formData con la URL del documento
        setFormData((prevData) => ({
          ...prevData,
          documento: data.secure_url, // Aquí se asigna correctamente
        }));
      }
    } catch (error) {
      console.error("Error al subir el archivo:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (selectedOptions, field) => {
    setFormData({
      ...formData,
      [field]: selectedOptions
        ? selectedOptions.map((option) => option.value)
        : [],
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
    <div className="bg-white shadow-lg items-center justify-center rounded-lg w-full max-w-8xl p-6 overflow-hidden">
      <div
        className="relative w-full h-32 bg-cover bg-center rounded-t-lg"
        style={{ backgroundImage: "url('/images/fondo.jpg')" }}
      >
        <div className="absolute inset-y-0 right-4 flex justify-center items-center">
          <h2 className="text-4xl font-bold text-[#691B31] text-center mt-4">
            REGISTRAR DOCUMENTOS ㅤㅤ
          </h2>

          <div className="bg-white p-3 rounded-full shadow-lg">
            <FaFileAlt
              className={`text-6xl text-[#691B31] ${
                isRotating ? "animate-spin" : ""
              }`}
            />
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-3 gap-4">
        <div>
          <label className="block font-bold">Folio</label>
          <input
            type="text"
            name="folio"
            value={formData.folio}
            readOnly
            className="w-full p-2 border rounded border-[#691B31] bg-gray-100 cursor-not-allowed"
          />
        </div>
        <div>
          <label className="block font-bold">Fecha de Registro</label>
          <input
            type="date"
            name="fecha"
            onChange={handleChange}
            required
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
            required
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
            required
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
            required
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
            required
            className="w-full p-2 border rounded border-[#691B31]"
          />
        </div>
        <div className="col-span-2">
          <label className="block font-bold">Área de Destino</label>
          <Select
            options={areaOptions}
            isMulti
            value={areaOptions.filter((option) =>
              formData.area.includes(option.value)
            )}
            onChange={(selected) => handleSelectChange(selected, "area")} // Aquí usamos "area" para coincidir con la base de datos
            required
            className="w-full border border-[#691B31] rounded-lg"
          />
        </div>
        <div>
          <label className="block font-bold">Importancia</label>
          <select
            onChange={handleChange}
            name="importancia"
            required
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
          <label className="block font-bold">Fecha Terminación</label>
          <input
            type="date"
            name="fechaTerminacion"
            onChange={handleChange}
            className="w-full p-2 border rounded border-[#691B31]"
          />
        </div>
        <div>
          <label className="block font-bold">Status</label>
          <select
            onChange={handleChange}
            name="status"
            required
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
          <label className="block font-bold text-[#691B31]">Subir PDF</label>

          {/* Contenedor para el input de archivo y el botón */}
          <div className="flex items-center gap-4">
            <input
              type="file"
              id="file-upload"
              onChange={handleFileChange}
              accept="application/pdf"
              className="w-full px-3 py-2 border border-[#691B31] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BC995B] transition duration-300 ease-in-out text-sm cursor-pointer text-center" // Ocultamos el input
            />

            <button
              type="button"
              onClick={handleUpload}
              className="px-6 py-2 bg-[#BC995B] text-white font-semibold rounded-lg shadow-md hover:bg-[#A87F50] focus:outline-none focus:ring-4  transition duration-300 ease-in-out text-sm transform hover:scale-105 focus:ring-[#BC995B]"
            >
              Subir
            </button>
          </div>

          {progress > 0 && (
            <p className="text-sm font-semibold text-gray-700">
              Progreso: {progress}%
            </p>
          )}

          {/* Mostrar archivo subido */}
          {downloadURL && (
            <>
              <p className="text-sm font-semibold text-gray-700 mb-2">
                Archivo subido:{" "}
                <a
                  href={downloadURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-bold"
                >
                  Ver PDF
                </a>
              </p>
              <input type="text" name="documento" readOnly />
            </>
          )}
        </div>

        <div className="col-span-3 flex justify-center items-center">
          <br></br>
          <br></br>
          <br></br>
          <button className="bg-[#691B31] text-white px-10 py-3 rounded-lg hover:bg-[#A02142] transform hover:scale-105 focus:ring-2 focus:ring-[#A02142]">
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Formulario;
