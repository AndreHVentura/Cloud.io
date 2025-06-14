import { useEffect, useState } from "react";
import NavBar from "../components/perfil/Navbar";
import Topbar from "../components/perfil/Topbar";
import {
  ButtonGroup,
  Container,
  StyledTable,
  DateFilterBox,
  PaginationContainer
} from "../styles/historico";
import { PDFDownloadLink } from "@react-pdf/renderer";
import MyDocument from "../styles/pdf";
import exportToExcel from "../styles/excel";
import Footer from "../components/pagina/Footer";

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
  const [mostrarFiltro, setMostrarFiltro] = useState(false);

  // Estados temporários para o formulário
  const [dataInicial, setDataInicial] = useState("");
  const [dataFinal, setDataFinal] = useState("");

  // Estados aplicados ao filtro
  const [dataAplicadaInicial, setDataAplicadaInicial] = useState("");
  const [dataAplicadaFinal, setDataAplicadaFinal] = useState("");

  const toggleNav = () => setIsNavOpen(!isNavOpen);
  const toggleFiltro = () => setMostrarFiltro(!mostrarFiltro);

  const aplicarFiltroPorData = () => {
    setPage(1); // Reinicia a paginação
    setDataAplicadaInicial(dataInicial);
    setDataAplicadaFinal(dataFinal);
    setMostrarFiltro(false);
    console.log('Aplicando filtro:', dataInicial, dataFinal);
  };

  useEffect(() => {
    async function fetchSensorData(currentPage = 1, limit = 50) {
      try {
        const params = new URLSearchParams({
          page: currentPage.toString(),
          limit: limit.toString(),
        });
  
        if (dataAplicadaInicial) params.set('startDate', dataAplicadaInicial);
        if (dataAplicadaFinal) params.set('endDate', dataAplicadaFinal);

  
        const url = `http://localhost:5000/api/sensors?${params.toString()}`;
        console.log('URL fetch:', url);

  
        const response = await fetch(url);
        const data = await response.json();
  
        setTableData(data.data);
        setPagination({
          page: data.page,
          limit: data.limit,
          total: data.total,
          totalPages: data.totalPages,
          hasNextPage: data.hasNextPage,
        });
      } catch (error) {
        console.error("Erro ao buscar dados do sensor:", error);
      }
    }
  
    fetchSensorData(page);
  }, [page, dataAplicadaInicial, dataAplicadaFinal]);

  return (
    <>
      <NavBar isOpen={isNavOpen} />
      <Topbar helper={toggleNav} isNavOpen={isNavOpen} />
      <br />
      <Container>
        <ButtonGroup>
          <button id="filter" onClick={toggleFiltro}>Filtrar por Data</button>
        </ButtonGroup>

        {mostrarFiltro && (
          <DateFilterBox>
            <h3>Filtro por Data</h3>
            <label>
              Data Inicial:
              <input
                type="date"
                value={dataInicial}
                onChange={(e) => setDataInicial(e.target.value)}
              />
            </label>
            <label>
              Data Final:
              <input
                type="date"
                value={dataFinal}
                onChange={(e) => setDataFinal(e.target.value)}
              />
            </label>
            <div>
              <button onClick={aplicarFiltroPorData}>Aplicar</button>
              <button onClick={toggleFiltro}>Fechar</button>
            </div>
          </DateFilterBox>
        )}

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

        {pagination && (
          <PaginationContainer>
            <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
              Voltar
            </button>
            <span>Página {pagination.page} de {pagination.totalPages}</span>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={!pagination.hasNextPage}
            >
              Avançar
            </button>
          </PaginationContainer>
        )}

        <div style={{ marginTop: "20px" }}>
          {/* <PDFDownloadLink document={<MyDocument data={tableData} />} fileName="relatorio_meteorologico.pdf">
            {({ loading }) => (loading ? "Carregando PDF..." : "Baixar Relatório em PDF")}
          </PDFDownloadLink> */}

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
        <Footer />
    </>
  );
}
