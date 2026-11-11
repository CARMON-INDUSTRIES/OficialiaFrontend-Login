import React from "react";
import { Document, Page, StyleSheet, Text, View, pdf } from "@react-pdf/renderer";
import JSZip from "jszip";

const styles = StyleSheet.create({
  page: { padding: 44, fontSize: 11, color: "#262626", lineHeight: 1.4 },
  heading: { fontSize: 22, fontFamily: "Helvetica-Bold", color: "#691B31" },
  subtitle: { fontSize: 13, marginTop: 4, marginBottom: 18 },
  field: { marginBottom: 10 },
  label: { fontFamily: "Helvetica-Bold", marginBottom: 2 },
  footer: { position: "absolute", bottom: 20, left: 44, right: 44, textAlign: "right", fontSize: 9 },
});

function RecordDocument({ record }) {
  const fields = [
    ["Fecha de registro", record.fecha?.slice(0, 10)],
    ["Estado", record.statusDescripcion],
    ["Comunidad", record.comunidadDescripcion],
    ["Dependencia", record.dependencia],
    ["Remitente", record.remitente],
    ["Destinatario", record.destinatario],
    ["Área de destino", record.areaDescripcion],
    ["Importancia", record.importanciaDescripcion],
    ["Fecha de terminación", record.fechaTerminacion?.slice(0, 10)],
    ["Asunto", record.asunto],
    ["Observaciones", record.observaciones],
  ];

  return (
    <Document title={`Registro de oficio ${record.folio}`}>
      <Page size="A4" style={styles.page}>
        <Text style={styles.heading}>Secretaría Municipal</Text>
        <Text style={styles.subtitle}>Registro de oficio · Folio {record.folio}</Text>
        {fields.filter(([, value]) => value).map(([label, value]) => (
          <View key={label} style={styles.field}>
            <Text style={styles.label} minPresenceAhead={16}>{label}</Text>
            <Text>{value}</Text>
          </View>
        ))}
        <Text fixed style={styles.footer} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
      </Page>
    </Document>
  );
}

export async function downloadCorrespondencias(records) {
  const filename = (record) => `oficio-${record.folio}-${record.id}.pdf`;
  let blob;
  let name;

  if (records.length === 1) {
    const [record] = records;
    blob = await pdf(<RecordDocument record={record} />).toBlob();
    name = filename(record);
  } else {
    const archive = new JSZip();
    for (const record of records) {
      const file = await pdf(<RecordDocument record={record} />).toBlob();
      archive.file(filename(record), await file.arrayBuffer());
    }
    blob = await archive.generateAsync({ type: "blob" });
    name = "oficios-seleccionados.zip";
  }

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
