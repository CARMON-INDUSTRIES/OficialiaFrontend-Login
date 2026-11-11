"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Select from "react-select";
import axios from "axios";
import Swal from "sweetalert2";

const fieldClass = "min-h-11 w-full rounded-md border border-[#b8b8b8] bg-white px-3 py-2.5 text-base text-[#262626] placeholder:text-[#716460] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#691B31]";
const buttonClass = "min-h-11 rounded-md px-5 py-2.5 text-base font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#691B31]";

const selectStyles = {
  control: (base, { isFocused }) => ({
    ...base,
    minHeight: 44,
    borderRadius: 6,
    borderColor: "#b8b8b8",
    boxShadow: "none",
    outline: isFocused ? "2px solid #691B31" : undefined,
    outlineOffset: 2,
  }),
  placeholder: (base) => ({ ...base, color: "#716460" }),
};

const Formulario = () => {
  const router = useRouter();
  const [areasDestino, setAreasDestino] = useState([]);
  const [comunidades, setComunidades] = useState([]);
  const [importancia, setImportancias] = useState([]);
  const [area, setAreas] = useState([]);
  const [status, setStatus] = useState([]);
  const [file, setFile] = useState(null);
  const [downloadURL, setDownloadURL] = useState("");

  const [formData, setFormData] = useState({
    folio: "",
    fecha: "",
    dependencia: "",
    comunidad: "",
    destinatario: "",
    asunto: "",
    area: [],
    importancia: "",
    status: "",
    documento: "",
    fechaTerminacion: "",
    observaciones: "",
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
        {
          ...formData,
          folio: Number(formData.folio),
          remitente: "",
          cargoRemitente: "",
          cargoDestinatario: "",
          fechaTerminacion: formData.fechaTerminacion || null,
        },
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

  const comunidadOptions = comunidades.map((comunidad) => ({
    value: comunidad.idComunidad,
    label: comunidad.nombreComunidad,
  }));

  const areaOptions = area.map((com) => ({
    value: com.idArea,
    label: com.nombreArea,
  }));

  return (
    <div className="mx-auto w-full max-w-4xl rounded-xl border border-[#dedede] bg-[#ffffff] text-[#262626]">
      <header className="rounded-t-xl border-b border-[#BC995B] bg-[#f5f5f5] px-5 py-6 sm:px-8">
        <h1 className="text-2xl font-semibold tracking-tight text-[#691B31] sm:text-3xl">Registrar oficio</h1>
        <p className="mt-1 text-base text-[#594b44]">Recepción de oficios · Secretaría Municipal</p>
      </header>
      <form onSubmit={handleSubmit} className="px-5 sm:px-8">
        <section className="border-b border-[#dedede] py-6">
          <h2 className="mb-4 text-base font-semibold text-[#691B31]">Identificación del oficio</h2>
          <div className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
            <div className="min-w-0">
              <label htmlFor="folio" className="mb-1.5 block text-base font-semibold">Folio</label>
              <input
                type="number"
                id="folio"
                name="folio"
                value={formData.folio}
                onChange={handleChange}
                min={1}
                max={2147483647}
                step={1}
                required
                className={fieldClass}
              />
            </div>
            <div className="min-w-0">
              <label htmlFor="dependencia" className="mb-1.5 block text-base font-semibold">Dependencia</label>
              <input
                type="text"
                id="dependencia"
                name="dependencia"
                onChange={handleChange}
                placeholder="Dependencia que emite el oficio"
                className={fieldClass}
              />
            </div>
            <div className="min-w-0">
              <label htmlFor="destinatario" className="mb-1.5 block text-base font-semibold">Destinatario</label>
              <input
                type="text"
                id="destinatario"
                name="destinatario"
                onChange={handleChange}
                placeholder="Nombre del destinatario"
                required
                className={fieldClass}
              />
            </div>
            <div className="min-w-0 sm:col-span-2">
              <label htmlFor="asunto" className="mb-1.5 block text-base font-semibold">Asunto</label>
              <input
                type="text"
                id="asunto"
                name="asunto"
                onChange={handleChange}
                placeholder="Asunto o descripción"
                required
                className={fieldClass}
              />
            </div>
          </div>
        </section>

        <section className="border-b border-[#dedede] py-6">
          <h2 className="mb-4 text-base font-semibold text-[#691B31]">Datos de registro</h2>
          <div className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
            <div className="min-w-0">
              <label htmlFor="fecha" className="mb-1.5 block text-base font-semibold">Fecha de registro</label>
              <input
                type="date"
                id="fecha"
                name="fecha"
                onChange={handleChange}
                required
                className={fieldClass}
              />
            </div>
            <div className="min-w-0">
              <label htmlFor="comunidad" className="mb-1.5 block text-base font-semibold">Comunidades</label>
              <Select
                inputId="comunidad"
                name="comunidad"
                options={comunidadOptions}
                value={comunidadOptions.find((option) => option.value === formData.comunidad) ?? null}
                onChange={(option) => setFormData((previous) => ({
                  ...previous,
                  comunidad: option?.value ?? "",
                }))}
                placeholder="Seleccionar o buscar comunidad"
                noOptionsMessage={() => "No se encontraron comunidades"}
                isSearchable
                required
                className="w-full text-base"
                styles={selectStyles}
              />
            </div>
            <div className="min-w-0">
              <label htmlFor="area-destino" className="mb-1.5 block text-base font-semibold">Área de Destino</label>
              <Select
                inputId="area-destino"
                options={areaOptions}
                placeholder="Seleccionar o buscar áreas"
                noOptionsMessage={() => "No se encontraron áreas"}
                isSearchable
                isMulti
                value={areaOptions.filter((option) =>
                  formData.area.includes(option.value)
                )}
                onChange={(selected) => handleSelectChange(selected, "area")}
                required
                className="w-full text-base"
                styles={selectStyles}
              />
            </div>
            <div className="min-w-0">
              <label htmlFor="importancia" className="mb-1.5 block text-base font-semibold">Importancia</label>
              <select
                onChange={handleChange}
                id="importancia"
                name="importancia"
                required
                className={fieldClass}
              >
                <option value="">Seleccionar importancia</option>
                {importancia.map((com) => (
                  <option key={com.idImportancia} value={com.idImportancia}>
                    {com.nivel}
                  </option>
                ))}
              </select>
            </div>
            <div className="min-w-0">
              <label htmlFor="status" className="mb-1.5 block text-base font-semibold">Estado</label>
              <select
                onChange={handleChange}
                id="status"
                name="status"
                required
                className={fieldClass}
              >
                <option value="">Seleccionar estado</option>
                {status.map((com) => (
                  <option key={com.idStatus} value={com.idStatus}>
                    {com.estado}
                  </option>
                ))}
              </select>
            </div>
            <div className="min-w-0">
              <label htmlFor="fechaTerminacion" className="mb-1.5 block text-base font-semibold">Fecha de terminación</label>
              <input
                type="date"
                id="fechaTerminacion"
                name="fechaTerminacion"
                onChange={handleChange}
                className={fieldClass}
              />
            </div>
          </div>
        </section>

        <section className="border-b border-[#dedede] py-6">
          <h2 className="mb-4 text-base font-semibold text-[#691B31]">Archivo y notas</h2>
          <div className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
            <div className="min-w-0 sm:col-span-2">
              <label htmlFor="file-upload" className="mb-1.5 block text-base font-semibold">Adjuntar PDF</label>

              <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
                <input
                  type="file"
                  id="file-upload"
                  onChange={handleFileChange}
                  accept="application/pdf"
                  className={fieldClass + " min-w-0 file:mr-2 file:font-semibold"}
                />

                <button
                  type="button"
                  onClick={handleUpload}
                  className={buttonClass + " shrink-0 border border-[#b8b8b8] bg-white text-[#691B31] hover:bg-[#f5f5f5]"}
                >
                  Subir
                </button>
              </div>


              {downloadURL && (
                <>
                  <p className="text-base font-semibold text-gray-700 mb-2">
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
                </>
              )}
            </div>
            <div className="min-w-0 sm:col-span-2">
              <label htmlFor="observaciones" className="mb-1.5 block text-base font-semibold">Observaciones</label>
              <textarea
                id="observaciones"
                name="observaciones"
                onChange={handleChange}
                placeholder="Agrega observaciones o notas adicionales..."
                className={fieldClass + " min-h-24 resize-y"}
              />
            </div>
          </div>
        </section>
        <div className="flex justify-end py-5">
          <button type="submit" className={buttonClass + " w-full bg-[#691B31] text-white hover:bg-[#A02142] sm:w-auto"}>
            Registrar oficio
          </button>
        </div>
      </form>
    </div>
  );
};

export default Formulario;
