"use client";
import { createContext, useState, useEffect } from "react";

export const NotificacionesContext = createContext();

export const NotificacionesProvider = ({ children }) => {
  const [notificaciones, setNotificaciones] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource("https://oficialialoginbackend.somee.com/api/Notificaciones");

    eventSource.onmessage = (event) => {
      const nuevaNotificacion = JSON.parse(event.data);
      setNotificaciones((prev) => [...prev, nuevaNotificacion]);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <NotificacionesContext.Provider value={{ notificaciones }}>
      {children}
    </NotificacionesContext.Provider>
  );
};

