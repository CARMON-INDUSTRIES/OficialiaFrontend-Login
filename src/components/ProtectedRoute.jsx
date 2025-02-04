"use client";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login"); // Redirigir a login si no está autenticado
    }
  }, [user, router]);

  if (!user) return null; // Evita renderizar el contenido antes de redirigir

  return children;
};

export default ProtectedRoute;
