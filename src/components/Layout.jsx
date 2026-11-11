"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  FaSignOutAlt,
  FaHome,
  FaUsers,
  FaBars,
  FaTimes,
  FaInbox,
  FaUserCircle,
} from "react-icons/fa";
import { FiFilePlus } from "react-icons/fi";
import { jwtDecode } from "jwt-decode";

const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return null;
  }
};

const Layout = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [roles, setRoles] = useState(null);
  const [userName, setUserName] = useState(""); // Estado para almacenar el nombre del usuario

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const decoded = decodeToken(token);

        // Extraer el nombre del usuario
        const extractedUserName =
          decoded?.userName ||
          decoded?.[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
          ];

        if (!extractedUserName) {
          console.error("No se pudo obtener el nombre de usuario del token.");
          return;
        }

        setUserName(extractedUserName); // Guardar en el estado

        // Obtener los usuarios con sus roles desde la API
        const response = await fetch(
          "https://oficialialoginbackend.somee.com/api/Roles/GetUsersWithRoles",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) throw new Error("Error al obtener los roles");

        const data = await response.json();

        // Buscar el usuario por su nombre de usuario
        const user = data.find((user) => user.userName === extractedUserName);

        if (user) {
          setRoles(user.roles || []);
        } else {
          console.warn("No se encontró al usuario en la lista de la API.");
          setRoles([]);
        }
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
        setRoles([]);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    router.push("/");
  };

  const isUser = roles?.includes("User") ?? false;
  const isAdmin = roles?.includes("Admin") ?? false;
  const isSuperAdmin = roles?.includes("SuperAdmin") ?? false;

  const links = [
    { href: "/consulta", label: "Registro de oficios", Icon: FaHome },
    ...((isAdmin || isSuperAdmin)
      ? [{ href: "/formulario", label: "Nuevo registro", Icon: FiFilePlus }]
      : []),
    { href: "/buzon", label: "Buzón", Icon: FaInbox },
    ...(isSuperAdmin ? [{ href: "/roles", label: "Roles y usuarios", Icon: FaUsers }] : []),
  ];

  return (
    <div className="municipal-workspace">
      <header className="municipal-topbar">
        <span>Secretaría Municipal</span>
        <button type="button" aria-controls="municipal-sidebar" aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />} Menú
        </button>
      </header>
      <aside id="municipal-sidebar" className="municipal-sidebar" data-open={isOpen}>
        <div className="municipal-brand">
          <span>Tula de Allende</span>
          <strong>Secretaría Municipal</strong>
        </div>
        <nav aria-label="Navegación principal">
          {links.map(({ href, label, Icon }) => (
            <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined}
              onClick={() => setIsOpen(false)}>
              <Icon aria-hidden="true" /> {label}
            </Link>
          ))}
        </nav>
        <div className="municipal-account">
          <p><FaUserCircle aria-hidden="true" /> {userName || "Usuario"}</p>
          <button type="button" onClick={handleLogout}><FaSignOutAlt aria-hidden="true" /> Cerrar sesión</button>
        </div>
      </aside>
      <main className="municipal-content">{children}</main>
    </div>
  );
};

export default Layout;
