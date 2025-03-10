// Respuesta.jsx
import { motion } from "framer-motion";
import { useState } from "react";

export default function Respuesta({ selectedRecord, closeModal }) {
  const [mensaje, setMensaje] = useState("");
  const [archivo, setArchivo] = useState(null);

  return (
    <motion.div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div className="bg-white p-6 rounded-lg shadow-lg w-96" initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-2xl text-center text-[#691B31] font-bold mb-4">RESPUESTA</h2>
        <p ><strong>Remitente:</strong> {selectedRecord.remitente}</p>
        <p><strong>Asunto:</strong> {selectedRecord.asunto}</p>
        <p><strong>Fecha:</strong> {selectedRecord.fecha}</p>
        <p><strong>Status:</strong> {selectedRecord.statusDescripcion}</p>
       
        <textarea className="w-full p-2 border rounded mt-4" placeholder="Escribe tu respuesta..." value={mensaje} onChange={(e) => setMensaje(e.target.value)}></textarea>
        <input type="file" className="w-full mt-2" onChange={(e) => setArchivo(e.target.files[0])} />
        <div className="flex gap-2 mt-4 justify-center">
          <button className="bg-red-500 text-white px-4 py-2 rounded transition duration-300 transform hover:scale-105 focus:ring-2 focus:ring-red-700 "
                 onClick={closeModal}>Cancelar</button>
          <button className="bg-green-500 text-white px-4 py-2 rounded transition duration-300 transform hover:scale-105 focus:ring-2 focus:ring-green-700">Enviar</button>
        </div>
      </motion.div>
    </motion.div>
  );
}
