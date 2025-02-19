"use client";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";

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

  return (
    showEditModal &&
    selectedRecord && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[50]">
        <div className="bg-gradient-to-br from-[#BC995B] to-[#ffffff] rounded-lg w-full max-w-3xl p-6 shadow-xl relative">
          {/* Encabezado con animación */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-[#000000]">
              Editar Registro
            </h2>
            <div className="text-[#000000] text-3xl animate-spin">
              <FaEdit />
            </div>
          </div>

          {/* Formulario */}
          <form onSubmit={handleEditSubmit}>
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
                  className="input-field"
                  value={selectedRecord.fecha}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold">
                  Dependencia
                </label>
                <input
                  type="text"
                  className="input-field"
                  value={selectedRecord.dependencia}
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
                  className="w-full p-2 border rounded border-[#691B31] bg-white"
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
                  className="input-field"
                  value={selectedRecord.remitente}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold">
                  Cargo Remitente
                </label>
                <input
                  type="text"
                  className="input-field"
                  value={selectedRecord.cargoRemitente}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold">Asunto</label>
                <input
                  type="text"
                  className="input-field"
                  value={selectedRecord.asunto}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold">
                  Destinatario
                </label>
                <input
                  type="text"
                  className="input-field"
                  value={selectedRecord.destinatario}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold">
                  Cargo Destinatario
                </label>
                <input
                  type="text"
                  className="input-field"
                  value={selectedRecord.cargoDestinatario}
                  onChange={handleChange}
                />
              </div>
              {/* Área - Dropdown */}
              <div>
                <label className="block text-gray-700 font-bold">Área</label>
                <input
                  type="text"
                  className="input-field"
                  defaultValue={selectedRecord.areaDescripcion}
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
                  className="w-full p-2 border rounded border-[#691B31] bg-white"
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
        </div>

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
