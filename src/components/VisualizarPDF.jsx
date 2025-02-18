import React from "react";

const VisualizarPDF = ({ documento }) => {
  return (
    <div>
      {documento ? (
        <div>
          <h2>Ver Documento PDF</h2>
          <iframe
            src={documento} // URL del PDF
            width="600"
            height="800"
            frameBorder="0"
            title="Documento PDF"
          />
        </div>
      ) : (
        <p>No se ha encontrado el documento.</p>
      )}
    </div>
  );
};

export default VisualizarPDF;
