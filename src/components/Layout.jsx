"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaSignOutAlt, FaHome, FaUsers, FaBars, FaTimes, FaInbox, FaCog } from "react-icons/fa";
import { FiFilePlus } from "react-icons/fi";


const Layout = ({ children }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <div className="flex h-screen bg-[#F5F5F5]">
      {/* Botón para abrir/cerrar el menú en móviles */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="sm:hidden fixed top-4 left-4 z-50 bg-[#691B31] text-white p-2 rounded-full"
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed sm:relative w-64 bg-[#691B31] text-white flex flex-col justify-between p-4 transition-all duration-300
          ${isOpen ? "left-0" : "-left-64"} sm:left-0 h-full z-40`}
      >
        <div>
          <div className="text-center p-6 border-b border-[#BC995B]">
            <h1 className="text-2xl font-bold">Unidad Central</h1>
            <h2 className="text-sm font-semibold">de Correspondencia</h2>
            <div className="flex justify-center items-center w-16 h-16 mx-auto">
              <FaUsers className="text-6xl text-slate-50" />
            </div>
          </div>
          <nav className="flex flex-col gap-4 px-4 mt-4">
  <Link href="/consulta" className="flex items-center gap-3 py-2 hover:text-[#BC995B] transition-colors group">
    <FaHome className="transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" /> Inicio
  </Link>
  <Link href="/formulario" className="flex items-center gap-3 py-2 hover:text-[#BC995B] transition-colors group">
    <FiFilePlus className="transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" /> Nuevo Registro
  </Link>
  <Link href="/roles" className="flex items-center gap-3 py-2 hover:text-[#BC995B] transition-colors group">
    <FaUsers className="transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" /> Roles y usuarios
  </Link>
  <Link href="/buzon" className="flex items-center gap-3 py-2 hover:text-[#BC995B] transition-colors group">
    <FaInbox className="transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" /> Buzón
  </Link>
</nav>

        </div>

        {/* Sección de Configuración y Cerrar Sesión */}
        <div className="mt-auto px-4 ">
          
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full py-2 mt-2 text-left hover:text-[#BC995B] transition-colors group-hover:rotate-12 group-hover:scale-110"
          >
            <FaSignOutAlt /> Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Contenido principal */}
      <main className={`flex-1 overflow-y-auto p-4 transition-all duration-300 ${isOpen ? "pl-64" : ""}`}>
        {children}
      </main>
    </div>
  );
};

export default Layout;


