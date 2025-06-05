import { useState } from "react";
import NavBar from "../components/perfil/Navbar";
import Topbar from "../components/perfil/Topbar";
import { ButtonGroup, Container, StyledTable } from "../styles/historico";
import { PDFDownloadLink } from "@react-pdf/renderer";
import MyDocument from "../styles/pdf";
import exportToExcel from "../styles/excel";

export default function Historico() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const toggleNav = () => setIsNavOpen(!isNavOpen);
  const tableData = [
    { date: "2021-10-01", time: "10:00", tempC: 25, hum: 60, pressBar: 1013, tempCabine: 22, charge: 75, srWm2: 500, windPeakMs: 15, windSpeedAvg: 5, windDirInst: "N", windDirAvg: "NE", waveHeight: 2 },
    { date: "2021-10-02", time: "11:00", tempC: 26, hum: 55, pressBar: 1012, tempCabine: 23, charge: 80, srWm2: 550, windPeakMs: 14, windSpeedAvg: 6, windDirInst: "S", windDirAvg: "SW", waveHeight: 1.8 },
    // Adicione mais dados conforme necessário
  ];

  // const exportToExcel = () => {
  //   const ws = XLSX.utils.table_to_sheet(document.getElementById('tabela') as HTMLTableElement);
  //   const wb = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'Tabela de dados');
  //   const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  //   const file = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  //   const url = window.URL.createObjectURL(file);

  //   const link = document.createElement('a');
  //   link.href = url;
  //   link.download = 'dados_meterologicos.xlsx'; // Nome do arquivo

  //   link.click(); // Dispara o download
  //   window.URL.revokeObjectURL(url); // Libera o objeto URL após o uso
  // };

  return (
    <>
      <NavBar isOpen={isNavOpen} />
      <Topbar helper={toggleNav} isNavOpen={isNavOpen} />
      <br></br>
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
            {tableData.map((row, index) => (
              <tr key={index}>
                <td>{row.date}</td>
                <td>{row.time}</td>
                <td>{row.tempC}</td>
                <td>{row.hum}</td>
                <td>{row.pressBar}</td>
                <td>{row.tempCabine}</td>
                <td>{row.charge}</td>
                <td>{row.srWm2}</td>
                <td>{row.windPeakMs}</td>
                <td>{row.windSpeedAvg}</td>
                <td>{row.windDirInst}</td>
                <td>{row.windDirAvg}</td>
                <td>{row.waveHeight}</td>
              </tr>
            ))}
          </tbody>
        </StyledTable>

        <div style={{ marginTop: '20px' }}>
          {/* Link para baixar o PDF */}
          <PDFDownloadLink document={<MyDocument />} fileName="relatorio_meteológico.pdf">
            {({ loading }) => (loading ? 'Carregando PDF...' : 'Baixar Relatório em PDF')}
          </PDFDownloadLink>

          {/* Botão para exportar para Excel */}
          <button
            onClick={exportToExcel}
            style={{
              background: 'none',
              color: 'blue',
              border: 'none',
              textDecoration: 'underline',
              cursor: 'pointer',
              marginLeft: '20px',
              padding: 0,
              fontSize: '1rem'
            }}
          >
            Exportar para Excel
          </button>
        </div>
      </Container>
    </>
  );
}
