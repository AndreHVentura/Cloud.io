import mongoose from 'mongoose';
import { SensorModel } from './src/models/Sensor';
 
async function connectDB() {
  await mongoose.connect('mongodb://localhost:27017/MetoDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as any);
  console.log("✅ Conectado ao MongoDB.");
}
 
// Adiciona campo fromBot
function gerarSensorFake(id: number) {
  return {
    mysqlId: `sensor-${Date.now()}-${id}`,
    temp: parseFloat((25 + Math.random() * 5).toFixed(2)),
    hum: parseFloat((50 + Math.random() * 10).toFixed(2)),
    bar: parseFloat((1000 + Math.random() * 10).toFixed(2)),
    cab_temp: parseFloat((26 + Math.random() * 2).toFixed(2)),
    bat_volts: parseFloat((12 + Math.random()).toFixed(2)),
    uv_level: parseFloat((Math.random() * 10).toFixed(2)),
    wind_peak: parseFloat((Math.random()).toFixed(2)),
    wind_rt: parseFloat((Math.random()).toFixed(2)),
    wind_avg: parseFloat((Math.random()).toFixed(2)),
    wind_dir_rt: Math.floor(Math.random() * 360),
    wind_dir_avg: Math.floor(Math.random() * 360),
    reading_time: new Date(),
    fromBot: true,
  };
}
 
async function inserirCincoLeituras() {
  console.log("📤 Inserindo 5 registros...");
  for (let i = 0; i < 5; i++) {
    const dado = gerarSensorFake(i);
    await SensorModel.create(dado);
    console.log(`✅ Dado ${i + 1} inserido`);
  }
  console.log("✅ Todos os 5 dados foram inseridos.\n");
}
 
async function startBot() {
  await connectDB();
 
  // Setup de captura de encerramento
  process.on('SIGINT', async () => {
    console.log("\n🔌 Encerrando (SIGINT)...");
    mongoose.disconnect();
    process.exit(0);
  });
 
  process.on('SIGTERM', async () => {
    console.log("\n🔌 Encerrando (SIGTERM)...");
    mongoose.disconnect();
    process.exit(0);
  });
 
  process.on('exit', async () => {
    console.log("\n🔁 Saindo...");
    mongoose.disconnect();
  });
 
  // Loop de inserção
  while (true) {
    try {
      await inserirCincoLeituras();
      console.log("⏳ Aguardando 2 minutos...");
      await new Promise((resolve) => setTimeout(resolve, 2*60000));
    } catch (error) {
      console.error("❌ Erro ao inserir dados:", error);
      break;
    }
  }
 
  mongoose.disconnect();
}
 
startBot();