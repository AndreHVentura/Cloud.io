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

export default function Historico() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [tableData, setTableData] = useState<SensorData[]>([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  

  const toggleNav = () => setIsNavOpen(!isNavOpen);

  useEffect(() => {
    async function fetchSensorData(currentPage = 1, limit = 100) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/sensors?page=${currentPage}&limit=${limit}`
        );
        const data = await response.json();
        // console.log("Dados recebidos:", data);
        setTableData(data.data);
        setPagination(data.pagination);
      } catch (error) {
        console.error("Erro ao buscar dados do sensor:", error);
      }
    }

    fetchSensorData(page, 100);
  }, [page]); // Atualiza os dados quando a página muda

  return (
    <>
      <NavBar isOpen={isNavOpen} />
      <Topbar helper={toggleNav} isNavOpen={isNavOpen} />
      <br />
      <Container>
        <ButtonGroup>
          <button id="e1">Estação 1</button>
          <button id="e2">Estação 2</button>
          <button id="e3">Estação 3</button>
          <button id="filter">Filtro</button>
        </ButtonGroup>

        <StyledTable id="tabela">
          <thead>
            <tr>
              <th>Data</th>
              <th>Hora</th>
              <th>Temperatura (°C)</th>
              <th>Umidade (%)</th>
              <th>Pressão (Bar)</th>
              <th>Temp. da Cabine (°C)</th>
              <th>Carga</th>
              <th>Radiação Solar (W/m²)</th>
              <th>Pico de Vento (m/s)</th>
              <th>Vel. Média do Vento (m/s)</th>
              <th>Dir. Inst. do Vento</th>
              <th>Dir. Média do Vento</th>
              <th>Altura da Onda</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => {
              const data = new Date(row.reading_time);
              const dataFormatada = data.toLocaleDateString();
              const horaFormatada = data.toLocaleTimeString();

              return (
                <tr key={index}>
                  <td>{dataFormatada}</td>
                  <td>{horaFormatada}</td>
                  <td>{row.temp}°C</td>
                  <td>{row.hum}%</td>
                  <td>{row.bar}</td>
                  <td>{row.cab_temp}</td>
                  <td>{row.bat_volts}</td>
                  <td>{row.uv_level}</td>
                  <td>{row.wind_peak}</td>
                  <td>{row.wind_avg}</td>
                  <td>{row.wind_rt}</td>
                  <td>{row.wind_dir_avg}</td>
                  <td>{row.wind_dir_rt}</td>
                </tr>
              );
            })}
          </tbody>
        </StyledTable>

        {/* Controles de paginação */}
        {pagination && (
          <div style={{ marginTop: "20px", display: "flex", gap: "10px", alignItems: "center" }}>
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
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
          <PDFDownloadLink document={<MyDocument />} fileName="relatorio_meteológico.pdf">
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
