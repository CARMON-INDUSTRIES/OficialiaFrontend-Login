"use client";
import React, { useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";

const ConsultaFolio = () => {
  const [folio, setFolio] = useState("");
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);

  const buscarFolio = async (e) => {
    e.preventDefault();

    if (!folio.trim()) {
      Swal.fire({
        title: "Campo vacío",
        text: "Por favor ingresa tu número de folio.",
        icon: "warning",
        confirmButtonColor: "#691B31",
      });
      return;
    }

    try {
      setLoading(true);
      setResultado(null);

      const response = await axios.get(
        `https://oficialialoginbackend.somee.com/api/Correspondencia/consultar-folio/${folio}`
      );

      setResultado(response.data);
    } catch (error) {
      console.error("Error al consultar:", error);
      Swal.fire({
        title: "No encontrado",
        text: "No se encontró información para el folio ingresado.",
        icon: "error",
        confirmButtonColor: "#691B31",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative p-6 bg-cover bg-center"
    style={{ backgroundImage: "url('/images/ciudadania.jpg')" }}>
      <div className="absolute inset-y-0  flex justify-center ">
          <h1 className="text-6xl font-serif text-[#691B31] text-center mt-4">
          ㅤㅤ<br/>
          ㅤㅤ<br/>
            ATENCIÓN CIUDADANA 
          </h1>
          </div>
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-[#691B31] mb-6">
          Consulta tu Folio
        </h1>

        <form onSubmit={buscarFolio} className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Ingresa tu número de folio"
            value={folio}
            onChange={(e) => setFolio(e.target.value)}
            className="flex-1 p-2 border border-[#691B31] rounded-lg focus:ring-2 focus:ring-[#BC995B]"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-[#691B31] text-white px-4 py-2 rounded-lg hover:bg-[#A02142] flex items-center justify-center"
          >
            {loading ? (
              <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
            ) : (
              <FaSearch />
            )}
          </button>
        </form>

        {resultado && (
          <div className="mt-6 border-t pt-4">
            <p>
              <strong>Folio:</strong> {resultado.folio}
            </p>
            <p>
              <strong>Dependencia:</strong> {resultado.dependencia}
            </p>
            <p>
              <strong>Asunto:</strong> {resultado.asunto}
            </p>
            <p>
              <strong>Fecha de Registro:</strong>{" "}
              {new Date(resultado.fecha).toLocaleDateString()}
            </p>
            <p>
              <strong>Estatus:</strong> {resultado.statusDescripcion}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsultaFolio;
