"use client";

import { useEffect, useRef, useState } from "react";

const consulta = {
  path: "/consulta",
  title: "Consulta tus oficios",
  text: "Busca por folio, asunto o comunidad. Si recuerdas el día de recepción, usa la fecha de registro.",
};
const detalle = {
  path: "/consulta",
  title: "Abre un oficio",
  text: "Usa el icono del ojo para ver los detalles y abrir el documento adjunto. El botón PDF descarga una ficha del oficio.",
};
const buzon = {
  path: "/buzon",
  title: "Revisa el buzón",
  text: "Aquí puedes consultar los avisos de nuevos oficios y abrir sus detalles.",
};
const captura = {
  path: "/formulario",
  title: "Registra un oficio recibido",
  text: "Captura el folio del documento físico, el asunto y los datos de registro. Puedes adjuntar el PDF antes de guardar.",
};
const seleccion = {
  path: "/consulta",
  title: "Trabaja con varios oficios",
  text: "Marca los oficios para descargar sus fichas en un ZIP. Si eliges eliminar, el sistema te pide confirmar.",
};
const usuarios = {
  path: "/roles",
  title: "Administra usuarios y permisos",
  text: "Usa el botón + para crear una cuenta. Desde el icono de edición puedes actualizar su correo, área y rol.",
};

const tours = {
  User: [consulta, detalle, buzon],
  Admin: [consulta, captura, seleccion, buzon],
  SuperAdmin: [consulta, captura, seleccion, buzon, usuarios],
};

const tourStorageKey = (userId, role) => "municipal-tour-v1:" + userId + ":" + role;

export function restartSystemTour(userId, role) {
  localStorage.removeItem(tourStorageKey(userId, role));
  return tours[role][0].path;
}

export default function SystemTour({ userId, role, pathname, navigate }) {
  const steps = tours[role];
  const storageKey = tourStorageKey(userId, role);
  const [index, setIndex] = useState(null);
  const heading = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    const step = Number(saved);
    setIndex(saved === "done" ? null : Number.isInteger(step) && steps[step] ? step : 0);
  }, [storageKey, steps]);

  const current = steps[index];
  const onStepPage = current?.path === pathname;

  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
  }, [index, onStepPage]);

  if (!current) return null;

  const goTo = (nextIndex) => {
    const next = steps[nextIndex];
    localStorage.setItem(storageKey, String(nextIndex));
    setIndex(nextIndex);
    if (next.path !== pathname) navigate(next.path);
  };

  const finish = () => {
    localStorage.setItem(storageKey, "done");
    setIndex(null);
  };
  const last = index === steps.length - 1;

  return (
    <aside aria-labelledby="system-tour-title"
      className="mb-5 rounded-lg border border-[#BC995B] bg-white p-4 sm:p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 id="system-tour-title" tabIndex={-1} ref={heading}
          className="text-lg font-semibold text-[#691B31] focus:outline-none">
          {onStepPage ? current.title : "Recorrido de bienvenida"}
        </h2>
        <p className="text-sm text-[#594b44]">Paso {index + 1} de {steps.length}</p>
      </div>
      <p className="mt-1">
        {onStepPage ? current.text : "Puedes retomar el recorrido donde lo dejaste."}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {!last && <button type="button" onClick={finish} className="municipal-secondary">Omitir recorrido</button>}
        {onStepPage && index > 0 && (
          <button type="button" onClick={() => goTo(index - 1)} className="municipal-secondary">Anterior</button>
        )}
        <button type="button"
          onClick={() => !onStepPage ? goTo(index) : last ? finish() : goTo(index + 1)}
          className="municipal-primary">
          {!onStepPage ? "Retomar recorrido" : last ? "Finalizar" : "Continuar"}
        </button>
      </div>
    </aside>
  );
}
