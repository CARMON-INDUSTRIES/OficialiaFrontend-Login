"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import Register from "./Register"; // Importa el formulario de registro

const RegisterModal = ({ isOpen, onClose, onUsersChanged }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 grid place-items-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        role="dialog"
        aria-modal="true"
        aria-label="Nuevo usuario"
        className="relative max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto rounded-xl border border-[#dedede] bg-white p-5 sm:p-6"
      >
        {/* Botón para cerrar */}
        <button
          type="button"
          aria-label="Cerrar registro de usuario"
          onClick={onClose}
          className="absolute top-4 right-4 text-[#621132] hover:text-gray-800"
        >
          <FaTimes size={20} />
        </button>

        {/* Componente de Registro */}
        <Register embedded onUsersChanged={onUsersChanged} />
      </motion.div>
    </div>
  );
};

export default RegisterModal;
