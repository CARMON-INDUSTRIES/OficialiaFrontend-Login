const Formulario = () => {
  const router = useRouter();
  const [isRotating, setIsRotating] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [areasDestino, setAreasDestino] = useState([]);
  const [comunidades, setComunidades] = useState([]);
  const [importancia, setImportancias] = useState([]);
  const [area, setAreas] = useState([]);
  const [status, setStatus] = useState([]);

  const [formData, setFormData] = useState({
    folio: "",
    fecha: "",
    dependencia: "",
    comunidad: "",
    remitente: "",
    cargoRemitente: "",
    destinatario: "",
    cargoDestinatario: "",
    asunto: "",
    areaDestino: [],
    importancia: "",
    status: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }

    const fetchData = async () => {
      try {
        const [comResp, areasResp, impResp, statusResp] = await Promise.all([
          axios.get("https://oficialialoginbackend.somee.com/api/Correspondencia/obtener-comunidades", { headers: { Authorization: `Bearer ${token}` } }),
          axios.get("https://oficialialoginbackend.somee.com/api/Correspondencia/obtener-areas", { headers: { Authorization: `Bearer ${token}` } }),
          axios.get("https://oficialialoginbackend.somee.com/api/Correspondencia/obtener-importancia", { headers: { Authorization: `Bearer ${token}` } }),
          axios.get("https://oficialialoginbackend.somee.com/api/Correspondencia/obtener-status", { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        setComunidades(comResp.data);
        setAreas(areasResp.data);
        setImportancias(impResp.data);
        setStatus(statusResp.data);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
    
    setTimeout(() => {
      setIsRotating(false);
    }, 1500);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (selectedOptions, field) => {
    setFormData({ ...formData, [field]: selectedOptions.map((option) => option.value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "https://oficialialoginbackend.somee.com/api/Correspondencia/registrar",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Registro exitoso:", response.data);
      alert("Documento registrado exitosamente");
      router.replace("/dashboard"); // Redirige tras el registro
    } catch (error) {
      console.error("Error al registrar:", error);
      alert("Hubo un error al registrar el documento");
    }
  };

  const areaOptions = area.map((a) => ({ value: a.idArea, label: a.nombreArea }));

  return (
    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-[#ffffff] to-[#691B31] p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-5xl p-6">
        <form className="mt-8 grid grid-cols-3 gap-4" onSubmit={handleSubmit}>
          <input type="text" name="folio" placeholder="Folio" onChange={handleChange} className="w-full p-2 border rounded border-[#691B31]" />
          <input type="date" name="fecha" onChange={handleChange} className="w-full p-2 border rounded border-[#691B31]" />
          <input type="text" name="dependencia" placeholder="Dependencia" onChange={handleChange} className="w-full p-2 border rounded border-[#691B31]" />

          <select name="comunidad" onChange={handleChange} className="w-full p-2 border rounded border-[#691B31]">
            <option value="">Seleccionar Comunidad</option>
            {comunidades.map((com) => (
              <option key={com.idComunidad} value={com.idComunidad}>{com.nombreComunidad}</option>
            ))}
          </select>

          <input type="text" name="remitente" placeholder="Remitente" onChange={handleChange} className="w-full p-2 border rounded border-[#691B31]" />
          <input type="text" name="cargoRemitente" placeholder="Cargo del Remitente" onChange={handleChange} className="w-full p-2 border rounded border-[#691B31]" />
          <input type="text" name="destinatario" placeholder="Destinatario" onChange={handleChange} className="w-full p-2 border rounded border-[#691B31]" />
          <input type="text" name="cargoDestinatario" placeholder="Cargo del Destinatario" onChange={handleChange} className="w-full p-2 border rounded border-[#691B31]" />
          <input type="text" name="asunto" placeholder="Asunto" onChange={handleChange} className="w-full p-2 border rounded border-[#691B31]" />

          <div className="col-span-2">
            <Select options={areaOptions} isMulti onChange={(selected) => handleSelectChange(selected, "areaDestino")} className="w-full border border-[#691B31] rounded-lg" />
          </div>

          <select name="importancia" onChange={handleChange} className="w-full p-2 border rounded border-[#691B31]">
            <option value="">Seleccionar Importancia</option>
            {importancia.map((imp) => (
              <option key={imp.idImportancia} value={imp.idImportancia}>{imp.nivel}</option>
            ))}
          </select>

          <select name="status" onChange={handleChange} className="w-full p-2 border rounded border-[#691B31]">
            <option value="">Seleccionar Status</option>
            {status.map((st) => (
              <option key={st.idStatus} value={st.idStatus}>{st.estado}</option>
            ))}
          </select>

          <div className="col-span-3 flex justify-end items-end">
            <button type="submit" className="bg-[#691B31] text-white px-6 py-2 rounded-lg hover:bg-[#A87F50]">
              Registrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Formulario;
