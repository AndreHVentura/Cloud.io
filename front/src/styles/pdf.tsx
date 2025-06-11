import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 20, backgroundColor: "white" },
  header: { fontWeight: "bold", textAlign: "center", marginBottom: 20, fontSize: 16 },
  container: {
    marginBottom: 15,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    borderBottomStyle: "solid",
  },
  row: { flexDirection: "row", marginBottom: 5 },
  label: { width: "40%", textAlign: "left", fontWeight: "bold" },
  value: { width: "60%", textAlign: "left" },
});

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

const MyDocument = ({ data }: { data: SensorData[] }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.header}>Relatório Histórico de Estações Meteorológicas</Text>
      {data.map((row, index) => {
        const dateObj = new Date(row.reading_time);
        const date = dateObj.toLocaleDateString();
        const time = dateObj.toLocaleTimeString();

        return (
          <View key={index} style={styles.container}>
            <Text style={styles.header}>Tabela {index + 1}</Text>

            <View style={styles.row}><Text style={styles.label}>Data:</Text><Text style={styles.value}>{date}</Text></View>
            <View style={styles.row}><Text style={styles.label}>Hora:</Text><Text style={styles.value}>{time}</Text></View>
            <View style={styles.row}><Text style={styles.label}>Temperatura (°C):</Text><Text style={styles.value}>{row.temp}</Text></View>
            <View style={styles.row}><Text style={styles.label}>Umidade (%):</Text><Text style={styles.value}>{row.hum}</Text></View>
            <View style={styles.row}><Text style={styles.label}>Pressão (Bar):</Text><Text style={styles.value}>{row.bar}</Text></View>
            <View style={styles.row}><Text style={styles.label}>Temp. da Cabine (°C):</Text><Text style={styles.value}>{row.cab_temp}</Text></View>
            <View style={styles.row}><Text style={styles.label}>Carga:</Text><Text style={styles.value}>{row.bat_volts}</Text></View>
            <View style={styles.row}><Text style={styles.label}>Radiação Solar (W/m²):</Text><Text style={styles.value}>{row.uv_level}</Text></View>
            <View style={styles.row}><Text style={styles.label}>Pico de Vento (m/s):</Text><Text style={styles.value}>{row.wind_peak}</Text></View>
            <View style={styles.row}><Text style={styles.label}>Vel. Média do Vento (m/s):</Text><Text style={styles.value}>{row.wind_avg}</Text></View>
            <View style={styles.row}><Text style={styles.label}>Dir. Inst. do Vento:</Text><Text style={styles.value}>{row.wind_rt}</Text></View>
            <View style={styles.row}><Text style={styles.label}>Dir. Média do Vento:</Text><Text style={styles.value}>{row.wind_dir_avg}</Text></View>
            <View style={styles.row}><Text style={styles.label}>Altura da Onda:</Text><Text style={styles.value}>{row.wind_dir_rt}</Text></View>
          </View>
        );
      })}
    </Page>
  </Document>
);

export default MyDocument;
