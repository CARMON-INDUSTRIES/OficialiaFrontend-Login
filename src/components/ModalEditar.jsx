"use client";

import Select from "react-select";
import { fieldClass, selectStyles } from "./OficioFields";
import { OficioDialog, OficioSection } from "./OficioDialog";

export default function ModalEditar({
  showEditModal, closeModal, selectedRecord, comunidades, areas, importancias, status,
  handleChange, setEditData, handleEditSubmit, editData, canEditIdentification, error, isSaving,
}) {
  if (!showEditModal || !selectedRecord) return null;

  const input = (name, label, { type = "text", readOnly = false, required = false, wide = false } = {}) => (
    <label className={"grid min-w-0 gap-1 font-semibold" + (wide ? " sm:col-span-2" : "")}>
          {label}
          <input
            name={name}
            type={type}
            readOnly={readOnly}
            required={required}
            value={type === "date" ? editData[name]?.slice(0, 10) ?? "" : editData[name] ?? ""}
            onChange={handleChange}
            className={fieldClass + " font-normal read-only:bg-[#f5f5f5]"}
          />
    </label>
  );

  const catalog = (name, label, options, description, searchable = false) => {
    const current = name === "area" ? editData.area?.[0] : editData[name];
    const available = current && !options.some(({ value }) => String(value) === String(current))
      ? [{ value: current, label: description || String(current) }, ...options]
      : options;
    const selected = available.find(({ value }) => String(value) === String(current)) ?? null;
    const id = "editar-" + name;

    return (
      <div className="min-w-0">
        <label htmlFor={id} className="mb-1 block font-semibold">{label}</label>
        {searchable ? (
          <Select
            inputId={id}
            options={available}
            value={selected}
            onChange={(option) => setEditData((previous) => ({
              ...previous,
              [name]: name === "area" ? [option.value] : option.value,
            }))}
            placeholder="Seleccionar o buscar"
            noOptionsMessage={() => "No se encontraron opciones"}
            screenReaderStatus={({ count }) => count === 1 ? "1 opción disponible" : count + " opciones disponibles"}
            styles={selectStyles}
            required
          />
        ) : (
          <select id={id} name={name} value={current ?? ""} onChange={handleChange} className={fieldClass} required>
            <option value="">Seleccionar</option>
            {available.map(({ value, label: text }) => <option key={value} value={value}>{text}</option>)}
          </select>
        )}
      </div>
    );
  };

  return (
    <OficioDialog title="Editar oficio" onClose={() => { if (!isSaving) closeModal(); }} actions={
      <>
        <button type="button" onClick={closeModal} disabled={isSaving} className="municipal-secondary">Cancelar</button>
        <button type="submit" form="editar-oficio" disabled={isSaving} className="municipal-primary disabled:opacity-60">{isSaving ? "Guardando…" : "Guardar cambios"}</button>
      </>
    }>
      <form id="editar-oficio" onSubmit={handleEditSubmit}>
        {canEditIdentification && (
          <OficioSection title="Identificación del oficio">
            {input("folio", "Folio", { readOnly: true })}
            {input("dependencia", "Dependencia")}
            {input("destinatario", "Destinatario", { required: true })}
            {input("asunto", "Asunto", { wide: true, required: true })}
          </OficioSection>
        )}
        <OficioSection title="Datos de registro">
          {canEditIdentification && (
            <>
              {input("fecha", "Fecha de registro", { type: "date", required: true })}
              {catalog("comunidad", "Comunidad", comunidades.map((item) => ({ value: item.idComunidad, label: item.nombreComunidad })), selectedRecord.comunidadDescripcion, true)}
              {catalog("area", "Área de destino", areas.map((item) => ({ value: item.idArea, label: item.nombreArea })), selectedRecord.areaDescripcion, true)}
              {catalog("importancia", "Importancia", importancias.map((item) => ({ value: item.idImportancia, label: item.nivel })), selectedRecord.importanciaDescripcion)}
            </>
          )}
          {catalog("status", "Estado", status.map((item) => ({ value: item.idStatus, label: item.estado })), selectedRecord.statusDescripcion)}
          {canEditIdentification && input("fechaTerminacion", "Fecha de terminación", { type: "date" })}
        </OficioSection>
        <OficioSection title="Archivo y notas">
          <label className="grid gap-1 font-semibold sm:col-span-2">
            Observaciones
            <textarea name="observaciones" value={editData.observaciones ?? ""} onChange={handleChange}
              className={fieldClass + " min-h-24 resize-y font-normal"} />
          </label>
        </OficioSection>
        {error && <p role="alert" className="pb-4 text-red-800">{error}</p>}
      </form>
    </OficioDialog>
  );
}
