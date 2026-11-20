"use client";

import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { apiBase } from "@/lib/apiBase";
import { OficioDialog, OficioSection } from "./OficioDialog";

const date = (value) => value ? value.slice(0, 10).split("-").reverse().join("/") : "Sin fecha";

function dateTime(value) {
  if (!value) return "Sin fecha registrada";
  return new Date(value).toLocaleString("es-MX", {
    timeZone: "America/Mexico_City", dateStyle: "short", timeStyle: "short",
  });
}

function Attachment({ url, children }) {
  if (!/^https?:\/\//i.test(url ?? "")) return <span>Sin documento adjunto</span>;
  return <a className="municipal-secondary inline-block" href={url}
    target="_blank" rel="noopener noreferrer">{children}</a>;
}

export default function Seguimiento() {
  const [records, setRecords] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [updated, setUpdated] = useState(null);

  const load = useCallback(async (signal) => {
    setRefreshing(true);
    try {
      const { data } = await axios.get(apiBase + "/Correspondencia/seguimiento", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        signal,
      });
      if (!Array.isArray(data)) throw new Error("Respuesta inválida");
      setRecords(data);
      setError("");
      setUpdated(new Date());
    } catch (err) {
      if (signal?.aborted) return;
      if (err.response?.status === 401 || err.response?.status === 403) setRecords([]);
      setError(err.response?.status === 401 ? "Vuelve a iniciar sesión para consultar el seguimiento."
        : err.response?.status === 403 ? "El seguimiento está disponible para administradores y superadministradores."
        : "No se pudo actualizar el seguimiento. Inténtalo de nuevo.");
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
        setRefreshing(false);
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    load(controller.signal);
    const interval = setInterval(() => load(controller.signal), 60000);
    return () => { clearInterval(interval); controller.abort(); };
  }, [load]);

  const selected = records.find(({ id }) => id === selectedId);
  const text = query.trim().toLowerCase();
  const filtered = records.filter((record) => [
    record.folio, record.asunto, record.destinatario, record.areaDescripcion,
    record.comunidadDescripcion, record.statusDescripcion,
  ].some((value) => String(value ?? "").toLowerCase().includes(text)));

  return (
    <div className="municipal-page municipal-panel">
      <h1 className="municipal-title">Seguimiento de oficios</h1>
      <p className="mb-4">Consulta la dirección asignada, el estado actual y las respuestas de cada oficio.</p>
      <div className="flex flex-wrap items-end gap-3">
        <label className="grid w-full max-w-lg gap-1 font-semibold">
          Buscar oficio
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)}
            placeholder="Folio, asunto, dirección o estado"
            className="min-h-11 rounded-md border bg-white px-3 font-normal" />
        </label>
        <button type="button" onClick={() => load()} disabled={refreshing}
          className="municipal-secondary">{refreshing ? "Actualizando…" : "Actualizar"}</button>
      </div>
      {updated && <p className="mt-3 text-sm" role="status">
        Última actualización {updated.toLocaleTimeString("es-MX")}. Se actualiza cada minuto.
      </p>}
      {error && <p role="alert" className="mt-3 text-red-800">{error}</p>}
      {loading ? <p className="py-6" role="status">Cargando seguimiento…</p> : (
        <div className="municipal-table" tabIndex={0} aria-label="Seguimiento de oficios">
          <table className="w-full text-left">
            <thead><tr>
              {["Folio", "Fecha de envío", "Asunto", "Dirección asignada", "Cambios registrados", "Respuesta", "Documentos", "Detalle"].map((label) => <th key={label} className="px-4 py-3">{label}</th>)}
            </tr></thead>
            <tbody className="divide-y">
              {!filtered.length && <tr><td colSpan={8} className="p-6 text-center">No hay oficios para mostrar.</td></tr>}
              {filtered.map((record) => (
                <tr key={record.id}>
                  <td className="px-4 py-3">{record.folio}</td>
                  <td className="px-4 py-3">{dateTime(record.fechaEnvio)}</td>
                  <td className="px-4 py-3">{record.asunto}</td>
                  <td className="px-4 py-3">{record.areaDescripcion || "Sin dirección asignada"}</td>
                  <td className="px-4 py-3"><p className="font-semibold">{record.statusDescripcion || "Sin estado"}</p>
                    <p className="mt-1 text-sm">{record.fechaCambioEstado
                      ? "Último cambio: " + dateTime(record.fechaCambioEstado)
                      : "Sin cambios de estado registrados"}</p>
                  </td>
                  <td className="px-4 py-3">{record.respuestaCorrecta ? "Con respuesta" : "Pendiente"}</td>
                  <td className="px-4 py-3">
                    {record.documento ? "Oficio adjunto" : "Sin oficio adjunto"}
                    {record.documentoRespuesta && " · Respuesta adjunta"}
                  </td>
                  <td className="px-4 py-3">
                    <button type="button" onClick={() => setSelectedId(record.id)} className="municipal-secondary">Ver seguimiento</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {selected && (
        <OficioDialog title={"Seguimiento del oficio " + selected.folio}
          onClose={() => setSelectedId(null)} actions={
            <button type="button" onClick={() => setSelectedId(null)} className="municipal-primary">Cerrar</button>
          }>
          <OficioSection title="Datos del oficio">
            {[
              ["Folio", selected.folio], ["Fecha de registro", date(selected.fecha)],
              ["Fecha de envío", dateTime(selected.fechaEnvio)],
              ["Tipo de documento", selected.tipoDocumento], ["Calle", selected.calle], ["Teléfono", selected.telefono],
              ["Dependencia", selected.dependencia], ["Destinatario", selected.destinatario],
              ["Comunidad", selected.comunidadDescripcion], ["Importancia", selected.importanciaDescripcion],
              ["Fecha de terminación", date(selected.fechaTerminacion)],
            ].map(([label, value]) => <div key={label}><p className="font-semibold">{label}</p><p className="break-words">{value || "Sin información"}</p></div>)}
            <div className="sm:col-span-2"><p className="font-semibold">Asunto</p><p className="whitespace-pre-wrap break-words">{selected.asunto}</p></div>
            <div className="sm:col-span-2"><Attachment url={selected.documento}>Abrir oficio adjunto</Attachment></div>
          </OficioSection>
          <OficioSection title="Destino y estado">
            <div><p className="font-semibold">Dirección asignada</p><p>{selected.areaDescripcion || "Sin dirección asignada"}</p></div>
            <div><p className="font-semibold">Estado actual</p><p>{selected.statusDescripcion || "Sin estado"}</p></div>
            <p className="text-sm sm:col-span-2">Último cambio de estado: {selected.fechaCambioEstado ? dateTime(selected.fechaCambioEstado) : "Sin cambios registrados"}</p>
            <p className="text-sm sm:col-span-2">La dirección corresponde a la asignación registrada. La confirmación de lectura aún no se registra.</p>
          </OficioSection>
          <OficioSection title="Respuesta">
            <div className="space-y-3 sm:col-span-2">
              <p>{selected.respuestaCorrecta ? "Respuesta registrada" : "Sin respuesta registrada"}</p>
              {selected.respuestaCorrecta && <>
                <p className="whitespace-pre-wrap break-words">{selected.mensajeRespuesta || "Sin mensaje"}</p>
                <Attachment url={selected.documentoRespuesta}>Abrir documento de respuesta</Attachment>
              </>}
            </div>
          </OficioSection>
        </OficioDialog>
      )}
    </div>
  );
}
