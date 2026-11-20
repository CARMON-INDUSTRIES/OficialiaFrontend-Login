"use client";

import { apiBase } from "@/lib/apiBase";
import { useState } from "react";
import axios from "axios";
import { OficioDialog, OficioSection } from "./OficioDialog";

function formatDate(value) {
  const date = value?.slice(0, 10).split("-");
  return date?.length === 3 ? date.reverse().join("/") : "";
}

function Detail({ label, value, wide = false }) {
  return (
    <div className={wide ? "sm:col-span-2" : undefined}>
      <dt className="font-semibold">{label}</dt>
      <dd className="mt-1 whitespace-pre-wrap break-words">{value || "Sin información"}</dd>
    </div>
  );
}

function Attachment({ url, children }) {
  if (!/^https?:\/\//i.test(url ?? "")) return null;
  return (
    <a href={url} target="_blank" rel="noopener noreferrer"
      className="municipal-secondary inline-flex items-center">
      {children}
    </a>
  );
}

export default function DetalleModal({ selectedRecord: record, closeModal }) {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadResponse = async () => {
    setLoading(true);
    setError("");

    try {
      const { data } = await axios.get(
        `${apiBase}/Respuesta/obtener/${record.respuestaCorrecta}`
      );
      if (data?.idRespuesta) setResponse(data);
      else setError("No se encontró la respuesta de este oficio.");
    } catch {
      setError("No se pudo cargar la respuesta. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <OficioDialog title="Detalles del oficio" onClose={closeModal} actions={
      <button type="button" onClick={closeModal} className="municipal-primary">Cerrar</button>
    }>
      <OficioSection title="Identificación del oficio">
        <dl className="col-span-full grid gap-4 sm:grid-cols-2">
          <Detail label="Folio" value={record.folio} />
          <Detail label="Dependencia" value={record.dependencia} />
          <Detail label="Destinatario" value={record.destinatario} />
          <Detail label="Tipo de documento" value={record.tipoDocumento} />
          <Detail label="Calle" value={record.calle} />
          <Detail label="Teléfono" value={record.telefono} />
          <Detail label="Asunto" value={record.asunto} wide />
        </dl>
      </OficioSection>
      <OficioSection title="Datos de registro">
        <dl className="col-span-full grid gap-4 sm:grid-cols-2">
          <Detail label="Fecha de registro" value={formatDate(record.fecha)} />
          <Detail label="Comunidad" value={record.comunidadDescripcion} />
          <Detail label="Área de destino" value={record.areaDescripcion} />
          <Detail label="Importancia" value={record.importanciaDescripcion} />
          <Detail label="Estado" value={record.statusDescripcion} />
          <Detail label="Fecha de terminación" value={formatDate(record.fechaTerminacion)} />
        </dl>
      </OficioSection>
      <OficioSection title="Archivo y notas">
        <dl className="col-span-full">
          <Detail label="Observaciones" value={record.observaciones} />
        </dl>
        <div className="col-span-full">
          <Attachment url={record.documento}>Ver documento adjunto</Attachment>
        </div>
      </OficioSection>
      {record.respuestaCorrecta && (
        <OficioSection title="Respuesta">
          <div className="col-span-full space-y-3">
            {response ? (
              <>
                <p className="whitespace-pre-wrap break-words">{response.mensaje}</p>
                <Attachment url={response.documentoRespuesta}>Ver documento de respuesta</Attachment>
              </>
            ) : (
              <button type="button" onClick={loadResponse} disabled={loading} className="municipal-secondary">
                {loading ? "Cargando respuesta…" : "Ver respuesta"}
              </button>
            )}
            {error && <p role="alert" className="text-red-800">{error}</p>}
          </div>
        </OficioSection>
      )}
    </OficioDialog>
  );
}
