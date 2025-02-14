"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import Register from "./Register"; // Importa el formulario de registro

const RegisterModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative"
      >
        {/* Botón para cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#621132] hover:text-gray-800"
        >
          <FaTimes size={20} />
        </button>

        {/* Componente de Registro */}
        <Register />
      </motion.div>
    </div>
  );
};

export default RegisterModal;
