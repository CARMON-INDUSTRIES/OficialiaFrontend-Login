"use client";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import { motion } from "framer-motion"; // Importa motion

const ModalEditar = ({
  showEditModal,
  setShowEditModal,
  selectedRecord,
  comunidades,
  importancias,
  status,
  handleChange,
  handleEditSubmit,
  editData,
}) => {
  
  if (!showEditModal) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    showEditModal &&
    selectedRecord && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[50]">
        {/* Aplica la animación al div que contiene el modal */}
        <motion.div
          className=" bg-[#F9F4DD] rounded-lg w-full max-w-3xl p-6 shadow-xl relative"
          initial={{ opacity: 0, y: -50 }} // Empieza arriba
          animate={{ opacity: 1, y: 0 }} // Mueve hacia la posición original
          exit={{ opacity: 0, y: 50 }} // Cuando se cierre, mueve hacia abajo
          transition={{
            type: "spring", // Para el efecto de rebote
            stiffness: 100, // Qué tan fuerte será el rebote
            damping: 15, // Cuánto se desacelera
            duration: 0.5, // Duración total
          }}
        >
          {/* Encabezado con animación */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-[#000000]">
              Editar Registro
            </h2>
            <div className="text-[#000000] text-3xl animate-spin duration-2000 ease-in-out">
              <FaEdit />
            </div>
          </div>

          {/* Formulario */}
          <form onSubmit={(e) => handleEditSubmit(e, editData)}>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-gray-700 font-bold">Folio</label>
                <input
                  type="text"
                  className="input-field"
                  value={selectedRecord.folio}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold">Fecha</label>
                <input
                  type="date"
                  name="fecha"
                  className="input-field"
                  value={formatDate(editData.fecha || selectedRecord.fecha).split('/').reverse().join('-')}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold">
                  Dependencia
                </label>
                <input
                  type="text"
                  name="dependencia"
                  className="input-field"
                  value={editData.dependencia}
                  onChange={handleChange}
                />
              </div>
              {/* Comunidad - Dropdown Compacto */}
              <div>
                <label className="block text-gray-700 font-bold">
                  Comunidad
                </label>
                <select
                  name="comunidad"
                  onChange={handleChange}
                  className="w-full p-2 border rounded border-[#BC995B] bg-white"
                  value={editData.comunidad || selectedRecord.idComunidad}
                >
                  <option value={selectedRecord.idComunidad} hidden>
                    {selectedRecord.comunidadDescripcion}{" "}
                    {/* Muestra la comunidad actual */}
                  </option>
                  {comunidades.map((com) => (
                    <option key={com.idComunidad} value={com.idComunidad}>
                      {com.nombreComunidad}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-bold">
                  Remitente
                </label>
                <input
                  type="text"
                  name="remitente"
                  className="input-field"
                  value={editData.remitente}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold">
                  Cargo Remitente
                </label>
                <input
                  type="text"
                  name="cargoRemitente"
                  className="input-field"
                  value={editData.cargoRemitente}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold">Asunto</label>
                <input
                  type="text"
                  name="asunto"
                  className="input-field"
                  value={editData.asunto}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold">
                  Destinatario
                </label>
                <input
                  type="text"
                  name="destinatario"
                  className="input-field"
                  value={editData.destinatario}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold">
                  Cargo Destinatario
                </label>
                <input
                  type="text"
                  name="cargoDestinatario"
                  className="input-field"
                  value={editData.cargoDestinatario}
                  onChange={handleChange}
                />
              </div>
              {/* Área - Dropdown */}
              <div>
                <label className="block text-gray-700 font-bold">Área</label>
                <input
                  type="text"
                  name="area"
                  className="input-field"
                  value={selectedRecord.areaDescripcion}
                />
              </div>
              {/* Importancia - Dropdown */}
              <div>
                <label className="block text-gray-700 font-bold">
                  Importancia
                </label>
                <select
                  name="importancia"
                  onChange={handleChange}
                  className="w-full p-2 border rounded border-[#BC995B] bg-white"
                  value={editData.importancia || selectedRecord.idImportancia}
                >
                  <option value={selectedRecord.idImportancia} hidden>
                    {selectedRecord.importanciaDescripcion}{" "}
                    {/* Muestra la comunidad actual */}
                  </option>
                  {importancias.map((com) => (
                    <option key={com.idImportancia} value={com.idImportancia}>
                      {com.nivel}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status - Dropdown */}
              <div>
                <label className="block text-gray-700 font-bold">Status</label>
                <select
                  name="status"
                  onChange={handleChange}
                  className="w-full p-2 border rounded border-[#691B31] bg-white"
                  value={editData.status || selectedRecord.idStatus}
                >
                  <option value={selectedRecord.idImportancia} hidden>
                    {selectedRecord.statusDescripcion}{" "}
                    {/* Muestra la comunidad actual */}
                  </option>
                  {status.map((com) => (
                    <option key={com.idStatus} value={com.idStatus}>
                      {com.estado}
                    </option>
                  ))}
                </select>
              </div> 
            </div>

            {/* Botones */}
            <div className="flex justify-end mt-6">
              <button
                type="button"
                className="btn-red mr-2"
                onClick={() => setShowEditModal(false)}
              >
                Cancelar
              </button>
              <button type="submit" className="btn-gold">
                Guardar Cambios
              </button>
            </div>
          </form>
        </motion.div>

        {/* Estilos JSX */}
        <style jsx>{`
          .input-field {
            width: 100%;
            padding: 8px;
            border: 1px solid #bc995b;
            border-radius: 8px;
            outline: none;
            transition: 0.3s;
          }
          .input-field:focus {
            border-color: #a87f50;
            box-shadow: 0 0 5px rgba(188, 153, 91, 0.5);
          }
          .btn-red {
            background-color: red;
            color: white;
            padding: 8px 16px;
            border-radius: 8px;
            transition: 0.3s;
          }
          .btn-red:hover {
            background-color: darkred;
          }
          .btn-gold {
            background-color: #bc995b;
            color: white;
            padding: 8px 16px;
            border-radius: 8px;
            transition: 0.3s;
          }
          .btn-gold:hover {
            background-color: #a87f50;
          }
        `}</style>
      </div>
    )
  );
};

export default ModalEditar;
