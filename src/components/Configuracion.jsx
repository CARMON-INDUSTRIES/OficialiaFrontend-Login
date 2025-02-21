"use client"; // Marca como cliente para hooks

import { useState, useEffect } from 'react';

export default function Configuracion() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [sidebarColor, setSidebarColor] = useState('#2d3748'); // Color predeterminado

  useEffect(() => {
    const storedMode = localStorage.getItem('darkMode');
    if (storedMode === 'true') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }

    const storedSidebarColor = localStorage.getItem('sidebarColor');
    if (storedSidebarColor) {
      setSidebarColor(storedSidebarColor);
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  };

  const handleSidebarColorChange = (e) => {
    const newColor = e.target.value;
    setSidebarColor(newColor);
    localStorage.setItem('sidebarColor', newColor);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Configuración</h2>

      {/* Modo Oscuro */}
      <div className="mt-4">
        <label className="block text-lg font-semibold">Modo Oscuro</label>
        <button
          onClick={toggleDarkMode}
          className="mt-2 px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-600"
        >
          {isDarkMode ? 'Desactivar Modo Oscuro' : 'Activar Modo Oscuro'}
        </button>
      </div>

      {/* Cambiar Color de Sidebar */}
      <div className="mt-6">
        <label className="block text-lg font-semibold">Color de Sidebar</label>
        <input
          type="color"
          value={sidebarColor}
          onChange={handleSidebarColorChange}
          className="mt-2 p-2 border rounded w-full"
        />
      </div>

      <div className="mt-6">
        <button
          onClick={() => {
            alert('Tus preferencias han sido guardadas.');
          }}
          className="mt-2 px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
        >
          Guardar Preferencias
        </button>
      </div>
    </div>
  );
}
