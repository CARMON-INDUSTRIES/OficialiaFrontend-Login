"use client";
import { FaEdit } from 'react-icons/fa';
import Swal from 'sweetalert2';

const ModalEditar = ({ showEditModal, setShowEditModal, selectedRecord, comunidades, handleChange, editData }) => {
  return (
    showEditModal && selectedRecord && (
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // Simulación de guardado
              const success = Math.random() > 0.2; // 80% éxito, 20% error
              if (success) {
                Swal.fire({
                  icon: "success",
                  title: "¡Éxito!",
                  text: "Cambios guardados exitosamente",
                  confirmButtonColor: "#BC995B",
                });
              } else {
                Swal.fire({
                  icon: "error",
                  title: "¡Error!",
                  text: " Ha ocurrido un error",
                  confirmButtonColor: "#BC995B",
                });
              }
            }}
          >
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-gray-700 font-bold">
                  Folio
                </label>
                <input
                  type="text"
                  className="input-field"
                  value={selectedRecord.folio}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold">
                  Fecha
                </label>
                <input
                  type="date"
                  className="input-field"
                  defaultValue={selectedRecord.fecha}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold">
                  Dependencia
                </label>
                <input
                  type="text"
                  className="input-field"
                  defaultValue={selectedRecord.dependencia}
                />
              </div>
              {/* Comunidad - Dropdown */}
              <div>
                <label className="block text-gray-700 font-bold">
                  Comunidad
                </label>
                <input
                  type="text"
                  className="input-field mb-2"
                  defaultValue={selectedRecord.comunidadDescripcion}
                  disabled // Solo para mostrar el valor actual sin edición
                />
                <select
                  name="comunidad"
                  onChange={handleChange}
                  className="w-full p-2 border rounded border-[#691B31]"
                  value={editData.comunidad || selectedRecord.idComunidad} // Carga el valor actual de la API
                >
                  <option value="">Seleccionar Comunidad</option>
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
                  defaultValue={selectedRecord.remitente}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold">
                  Cargo Remitente
                </label>
                <input
                  type="text"
                  className="input-field"
                  defaultValue={selectedRecord.cargoRemitente}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold">
                  Asunto
                </label>
                <input
                  type="text"
                  className="input-field"
                  defaultValue={selectedRecord.asunto}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold">
                  Destinatario
                </label>
                <input
                  type="text"
                  className="input-field"
                  defaultValue={selectedRecord.destinatario}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold">
                  Cargo Destinatario
                </label>
                <input
                  type="text"
                  className="input-field"
                  defaultValue={selectedRecord.cargoDestinatario}
                />
              </div>
              {/* Área - Dropdown */}
              <div>
                <label className="block text-gray-700 font-bold">
                  Área
                </label>
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
                <input
                  type="text"
                  className="input-field"
                  defaultValue={selectedRecord.importanciaDescripcion}
                />
              </div>

              {/* Status - Dropdown */}
              <div>
                <label className="block text-gray-700 font-bold">
                  Status
                </label>
                <input
                  type="text"
                  className="input-field"
                  defaultValue={selectedRecord.statusDescripcion}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold">
                  Documento
                </label>
                <input
                  type="text"
                  className="input-field"
                  defaultValue={selectedRecord.documento}
                />
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
