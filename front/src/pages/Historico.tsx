import { useEffect, useState } from "react";
import NavBar from "../components/perfil/Navbar";
import Topbar from "../components/perfil/Topbar";
import { ButtonGroup, Container, StyledTable } from "../styles/historico";
import { PDFDownloadLink } from "@react-pdf/renderer";
import MyDocument from "../styles/pdf";
import exportToExcel from "../styles/excel";

interface SensorData {
  mysqlId: string;
  temp: number;
  hum: number;
  bar: number;
  cab_temp: number;
  bat_volts: number;
  uv_level: number;
  wind_peak: number;
  wind_rt: number;
  wind_avg: number;
  wind_dir_rt: number;
  wind_dir_avg: number;
  reading_time: string | Date;
}

interface PaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
}

// ... imports

export default function Historico() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [tableData, setTableData] = useState<SensorData[]>([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const [mostrarFiltro, setMostrarFiltro] = useState(false);

  const [filtrosSelecionados, setFiltrosSelecionados] = useState({
    temp: true,
    hum: true,
    bar: true,
    cab_temp: true,
    bat_volts: true,
    uv_level: true,
    wind_peak: true,
    wind_avg: true,
    wind_rt: true,
    wind_dir_rt: true,
    wind_dir_avg: true,
    reading_time: true,
  });

  const [filtrosAplicados, setFiltrosAplicados] = useState({ ...filtrosSelecionados });

  // 🟡 Mapeamento de nomes legíveis
  const nomesFiltros: Record<keyof typeof filtrosSelecionados, string> = {
    reading_time: "Data e Hora",
    temp: "Temperatura (°C)",
    hum: "Umidade (%)",
    bar: "Pressão (Bar)",
    cab_temp: "Temp. da Cabine (°C)",
    bat_volts: "Carga da Bateria (V)",
    uv_level: "Radiação Solar (W/m²)",
    wind_peak: "Pico de Vento (m/s)",
    wind_avg: "Vel. Média do Vento (m/s)",
    wind_rt: "Dir. Inst. do Vento",
    wind_dir_avg: "Dir. Média do Vento",
    wind_dir_rt: "Altura da Onda",
  };

  const toggleNav = () => setIsNavOpen(!isNavOpen);
  const toggleFiltro = () => setMostrarFiltro(!mostrarFiltro);

  const handleCheckboxChange = (key: keyof typeof filtrosSelecionados) => {
    setFiltrosSelecionados((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const aplicarFiltros = () => {
    setFiltrosAplicados({ ...filtrosSelecionados });
    setMostrarFiltro(false);
  };

  useEffect(() => {
    async function fetchSensorData(currentPage = 1, limit = 100) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/sensors?page=${currentPage}&limit=${limit}`
        );
        const data = await response.json();
        setTableData(data.data);
        setPagination(data.pagination);
      } catch (error) {
        console.error("Erro ao buscar dados do sensor:", error);
      }
    }

    fetchSensorData(page, 100);
  }, [page]);

  return (
    <>
      <NavBar isOpen={isNavOpen} />
      <Topbar helper={toggleNav} isNavOpen={isNavOpen} />
      <br />
      <Container>
        <ButtonGroup>
          <button id="filter" onClick={toggleFiltro}>Filtro</button>
        </ButtonGroup>

        {mostrarFiltro && (
          <div
            style={{
              marginTop: "20px",
              padding: "20px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              backgroundColor: "#f2f2f2",
              width: "300px",
              color: "black",
              flexWrap:"wrap"
            }}
          >
            <h3>Filtros</h3>
            {Object.entries(filtrosSelecionados).map(([key, value]) => (
              <label key={key}>
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => handleCheckboxChange(key as keyof typeof filtrosSelecionados)}
                />{" "}
                {nomesFiltros[key as keyof typeof nomesFiltros]}
                <br />
              </label>
            ))}
            <br />
            <button onClick={aplicarFiltros}>Aplicar</button>{" "}
            <button onClick={toggleFiltro}>Fechar</button>
          </div>
        )}

        <StyledTable id="tabela">
          <thead>
            <tr>
              {filtrosAplicados.reading_time && (
                <>
                  <th>Data</th>
                  <th>Hora</th>
                </>
              )}
              {filtrosAplicados.temp && <th>Temperatura (°C)</th>}
              {filtrosAplicados.hum && <th>Umidade (%)</th>}
              {filtrosAplicados.bar && <th>Pressão (Bar)</th>}
              {filtrosAplicados.cab_temp && <th>Temp. da Cabine (°C)</th>}
              {filtrosAplicados.bat_volts && <th>Carga</th>}
              {filtrosAplicados.uv_level && <th>Radiação Solar (W/m²)</th>}
              {filtrosAplicados.wind_peak && <th>Pico de Vento (m/s)</th>}
              {filtrosAplicados.wind_avg && <th>Vel. Média do Vento (m/s)</th>}
              {filtrosAplicados.wind_rt && <th>Dir. Inst. do Vento</th>}
              {filtrosAplicados.wind_dir_avg && <th>Dir. Média do Vento</th>}
              {filtrosAplicados.wind_dir_rt && <th>Altura da Onda</th>}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => {
              const data = new Date(row.reading_time);
              const dataFormatada = data.toLocaleDateString();
              const horaFormatada = data.toLocaleTimeString();

              return (
                <tr key={index}>
                  {filtrosAplicados.reading_time && (
                    <>
                      <td>{dataFormatada}</td>
                      <td>{horaFormatada}</td>
                    </>
                  )}
                  {filtrosAplicados.temp && <td>{row.temp}°C</td>}
                  {filtrosAplicados.hum && <td>{row.hum}%</td>}
                  {filtrosAplicados.bar && <td>{row.bar}</td>}
                  {filtrosAplicados.cab_temp && <td>{row.cab_temp}</td>}
                  {filtrosAplicados.bat_volts && <td>{row.bat_volts}</td>}
                  {filtrosAplicados.uv_level && <td>{row.uv_level}</td>}
                  {filtrosAplicados.wind_peak && <td>{row.wind_peak}</td>}
                  {filtrosAplicados.wind_avg && <td>{row.wind_avg}</td>}
                  {filtrosAplicados.wind_rt && <td>{row.wind_rt}</td>}
                  {filtrosAplicados.wind_dir_avg && <td>{row.wind_dir_avg}</td>}
                  {/* {filtrosAplicados.wind_dir_rt && <td>{row.wind_dir_rt}</td>} */}
                </tr>
              );
            })}
          </tbody>
        </StyledTable>

        {pagination && (
          <div style={{ marginTop: "20px", display: "flex", gap: "10px", alignItems: "center", color: "black" }}>
            <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
              Página Anterior
            </button>
            <span>
              Página {pagination.page} de {pagination.totalPages}
            </span>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={!pagination.hasNextPage}
            >
              Próxima Página
            </button>
          </div>
        )}

        <div style={{ marginTop: "20px" }}>
          <PDFDownloadLink document={<MyDocument data={tableData} />} fileName="relatorio_meteológico.pdf">
            {({ loading }) => (loading ? "Carregando PDF..." : "Baixar Relatório em PDF")}
          </PDFDownloadLink>

          <button
            onClick={exportToExcel}
            style={{
              background: "none",
              color: "blue",
              border: "none",
              textDecoration: "underline",
              cursor: "pointer",
              marginLeft: "20px",
              padding: 0,
              fontSize: "1rem",
            }}
          >
            Exportar para Excel
          </button>
        </div>
      </Container>
    </>
  );
}
