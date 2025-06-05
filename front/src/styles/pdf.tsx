import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  container: {
    marginBottom: 15, // Espaço entre os grupos de dados
    padding: 10,
    borderBottom: '1px solid #333', // Linha separadora entre grupos de dados
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5, // Espaço entre cada linha de dados
  },
  label: {
    width: '40%', // Largura para o label à esquerda
    textAlign: 'left',
    fontWeight: 'bold',
  },
  value: {
    width: '60%', // Largura para o valor à direita
    textAlign: 'left',
  },
});
const tableData = [
    { date: "2021-10-01", time: "10:00", tempC: 25, hum: 60, pressBar: 1013, tempCabine: 22, charge: 75, srWm2: 500, windPeakMs: 15, windSpeedAvg: 5, windDirInst: "N", windDirAvg: "NE", waveHeight: 2 },
    { date: "2021-10-02", time: "11:00", tempC: 26, hum: 55, pressBar: 1012, tempCabine: 23, charge: 80, srWm2: 550, windPeakMs: 14, windSpeedAvg: 6, windDirInst: "S", windDirAvg: "SW", waveHeight: 1.8 },
    // Adicione mais dados conforme necessário
  ];
const MyDocument = () => (
   <Document>
    <Page style={styles.page}>
      <Text style={styles.header}>Relatório Histórico de Estações Meteorológicas</Text>
      {tableData.map((row, index) => (
        <View key={index} style={styles.container}>
          {/* Título da tabela, caso você queira adicionar como Tabela 1, Tabela 2... */}
          <Text style={styles.header}>Tabela {index + 1}</Text>

          {/* Exibição dos dados em formato de "lista" */}
          <View style={styles.row}>
            <Text style={styles.label}>Data:</Text>
            <Text style={styles.value}>{row.date}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Hora:</Text>
            <Text style={styles.value}>{row.time}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Temperatura (°C):</Text>
            <Text style={styles.value}>{row.tempC}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Pressão (Bar):</Text>
            <Text style={styles.value}>{row.pressBar}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Temp. da Cabine (°C):</Text>
            <Text style={styles.value}>{row.tempCabine}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Carga:</Text>
            <Text style={styles.value}>{row.charge}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Radiação Solar (W/m²):</Text>
            <Text style={styles.value}>{row.srWm2}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Pico de Vento (m/s):</Text>
            <Text style={styles.value}>{row.windPeakMs}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Vel. Média do Vento (m/s):</Text>
            <Text style={styles.value}>{row.windSpeedAvg}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Dir. Inst. do Vento:</Text>
            <Text style={styles.value}>{row.windDirInst}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Dir. Média do Vento:</Text>
            <Text style={styles.value}>{row.windDirAvg}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Altura da Onda:</Text>
            <Text style={styles.value}>{row.waveHeight}</Text>
          </View>
        </View>
      ))}
    </Page>
  </Document>
  );

export default MyDocument