"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaSignOutAlt, FaHome, FaUsers } from "react-icons/fa";
import { FiFilePlus } from "react-icons/fi";

const Layout = ({ children }) => {
  const router = useRouter(); // Hook para redirección

  const handleLogout = () => {
    // Eliminar el token de las cookies
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    localStorage.getItem("token");


    // Redirigir al usuario a la página de inicio de sesión
    router.push("/");
  };

  return (
    <div className="flex h-screen bg-[#F5F5F5]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#691B31] text-white flex flex-col justify-between">
        <div>
          <div className="text-center p-6 border-b border-[#BC995B]">
            <h1 className="text-2xl font-bold">Unidad Central</h1>
            <h2 className="text-sm font-semibold">de Correspondencia</h2>
            <div className="flex justify-center items-center w-16 h-16 mx-auto">
              <FaUsers className="text-6xl text-slate-50" />
            </div>
          </div>
          <nav className="flex flex-col gap-4 px-6 mt-4">
            <Link href="/consulta" className="flex items-center gap-3 py-2 hover:text-[#BC995B]">
              <FaHome /> Inicio
            </Link>
            <Link href="/formulario" className="flex items-center gap-3 py-2 hover:text-[#BC995B]">
              <FiFilePlus /> Nuevo Registro
            </Link>
            <Link href="/roles" className="flex items-center gap-3 py-2 hover:text-[#BC995B]">
              <FaUsers /> Roles y usuarios
            </Link>
          </nav>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-6 py-4 hover:text-[#BC995B]"
        >
          <FaSignOutAlt /> Cerrar Sesión
        </button>
      </aside>

      {/* Contenido dinámico */}
      <main className="flex-1 ">{children}</main>
    </div>
  );
};

export default Layout;
