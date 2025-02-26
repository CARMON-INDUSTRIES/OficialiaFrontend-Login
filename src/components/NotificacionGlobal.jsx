"use client";
import { useContext, useEffect, useState } from "react";
import { NotificacionesContext } from "@/contexts/NotificacionesContext";

const NotificacionGlobal = () => {
  const { notificaciones } = useContext(NotificacionesContext);
  const [notificacionVisible, setNotificacionVisible] = useState(null);

  useEffect(() => {
    if (notificaciones.length > 0) {
      setNotificacionVisible(notificaciones[notificaciones.length - 1]);
      setTimeout(() => {
        setNotificacionVisible(null);
      }, 5000); // Ocultar después de 5 segundos
    }
  }, [notificaciones]);

  if (!notificacionVisible) return null;

  return (
    <div className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded shadow-lg animate-fade-in">
      {notificacionVisible.mensaje}
    </div>
  );
};

export default NotificacionGlobal;
