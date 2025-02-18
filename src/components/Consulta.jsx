"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import Layout from "@/components/Layout";
import axios from "axios";
import Swal from "sweetalert2";
import DetalleModal from "@/components/DetalleModal";
import ModalEditar from "@/components/ModalEditar"; 

const Dashboard = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [records, setRecords] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [editData, setEditData] = useState({});
  const [comunidades, setComunidades] = useState([]);
  const [areas, setAreas] = useState([]);
  const [importancias, setImportancias] = useState([]);
  const [status, setStatus] = useState([]);
  const [numPages, setNumPages] = useState(null);

  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else if (records.length === 0) {
      fetchRecords(token);
    }
  }, []);

  useEffect(() => {
    if (showEditModal) {
      fetchData();
    }
  }, [showEditModal]);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
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

  const fetchRecords = async (token) => {
    try {
      const response = await axios.get(
        "https://oficialialoginbackend.somee.com/api/Correspondencia/obtener",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Datos obtenidos:", response.data);

      setRecords(response.data);
    } catch (error) {
      console.error("Error al obtener registros:", error);
    }
  };

  const handleDeleteConfirmation = (folio) => {
    Swal.fire({
      title: "¿Estás seguro de querer eliminar este registro?",
      text: "¡Esta acción no se puede deshacer!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, cancelar",
      confirmButtonColor: "#691B31",
      cancelButtonColor: "#d33",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          const token = localStorage.getItem("token");
          await axios.delete(
            `https://oficialialoginbackend.somee.com/api/Correspondencia/obtener${folio}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setRecords(records.filter((record) => record.folio !== folio));
          Swal.fire({
            icon: "success",
            title: "Registro eliminado",
            text: "El registro ha sido eliminado exitosamente.",
            confirmButtonColor: "#691B31",
          });
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "¡Error!",
            text: "Ha ocurrido un error al eliminar el registro.",
            confirmButtonColor: "#691B31",
          });
        }
      },
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value, // Actualiza el valor seleccionado
    }));
  };

  const handleView = (record) => {
    setSelectedRecord(record);
    setShowModal(true);
  };

  const handleEdit = (record) => {
    setSelectedRecord(record);
    setShowEditModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedRecord(null);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditData({});
  };

  // Lógica de filtrado mejorada para incluir 'fecha', 'dependencia', 'asunto', 'estatus', y 'folio'
  const filteredRecords = [
    ...new Map(records.map((item) => [item.folio, item])).values(),
  ].filter((record) => {
    const searchLower = search.toLowerCase();
    return (
      String(record.folio).includes(search) ||
      (record.fecha && record.fecha.toLowerCase().includes(searchLower)) ||
      (record.dependencia &&
        record.dependencia.toLowerCase().includes(searchLower)) ||
      (record.asunto && record.asunto.toLowerCase().includes(searchLower)) ||
      (record.status?.toString().toLowerCase().includes(searchLower))

    );
  });

  // Dentro del componente
  const formatDate = (dateString) => {
    const date = new Date(dateString); // Convierte la cadena en un objeto Date
    return date.toLocaleDateString("es-ES", {
      // Formatea la fecha
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <Layout>
      <div className="h-full w-full flex flex-col items-center bg-gradient-to-br from-[#ffffff] to-[#BC995B] p-6">
        <div className="bg-white shadow-lg rounded-lg w-full max-w-8xl p-6 overflow-hidden">
          <h1 className="text-3xl font-bold mb-4">Inicio</h1>
          <input
            type="text"
            placeholder="Buscar registros..."
            className="w-full max-w-md px-4 py-2 border border-[#691B31] rounded-lg focus:outline-none focus:border-[#BC995B]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="overflow-y-auto max-h-[500px] mt-6 border rounded-lg">
            <table className="min-w-full bg-white">
              <thead className="bg-[#BC995B] text-white sticky top-0 z-10">
                <tr>
                  <th className="py-3 px-6 text-left">Folio</th>
                  <th className="py-3 px-6 text-left">Fecha</th>
                  <th className="py-3 px-6 text-left">Dependencia</th>
                  <th className="py-3 px-6 text-left">Asunto</th>
                  <th className="py-3 px-6 text-left">Status</th>
                  <th className="py-3 px-6 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredRecords.map((record) => (
                  <tr key={record.folio} className="border-b">
                    <td className="py-3 px-6">{record.folio}</td>
                    <td className="py-3 px-6">
                      {record.fecha
                        ? formatDate(record.fecha)
                        : "Fecha no disponible"}
                    </td>
                    <td className="py-3 px-6">{record.dependencia}</td>
                    <td className="py-3 px-6">{record.asunto}</td>
                    <td className="py-3 px-6">{record.statusDescripcion}</td>
                    <td className="py-3 px-6 flex justify-center gap-4">
                      <button
                        className="text-blue-500 hover:underline"
                        onClick={() => handleView(record)}
                      >
                        <FaEye />
                      </button>
                      <button
                        className="text-green-500 hover:underline"
                        onClick={() => handleEdit(record)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-red-500 hover:underline"
                        onClick={() => handleDeleteConfirmation(record.folio)}
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {showModal && selectedRecord && (
            <DetalleModal
            selectedRecord={selectedRecord}
            closeModal={closeModal}
          />
          )}

          {showEditModal && selectedRecord && (
            <ModalEditar
            showEditModal={showEditModal}
            setShowEditModal={setShowEditModal}
            selectedRecord={selectedRecord}
            comunidades={comunidades}
            handleChange={(e) =>
              setEditData({ ...editData, [e.target.name]: e.target.value })
            }
            editData={editData}
          />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
