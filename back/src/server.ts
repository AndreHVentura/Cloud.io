import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import connectDB from './config/db';
import userRoutes from './routes/userRoutes';
import protectedUserRouter from './routes/protectedRoutes/userRoutes';
import sensorRoutes from './routes/sensorRoutes';
import cors from 'cors';
import syncRoutes from './routes/syncRoutes';
import syncService from './services/syncService';

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

console.log("MONGO_URI from .env:", process.env.MONGO_URI);

// Verifica saúde do MySQL ao iniciar
syncService.checkMySQLHealth().then(status => {
    console.log(`✅ MySQL está ${status ? 'online' : 'offline'}`);
})
.catch(err => {
  console.error('Erro ao verificar MySQL:', err);
});

app.use(cors());
app.use(express.json());

//rotas
app.use('/api/users', userRoutes);

// Rotas protegidas
app.use('/api/protected', protectedUserRouter);

// Rota para os sensores
app.use('/api/sensors', sensorRoutes);

//sincronizaçao
app.use('/api/sync', syncRoutes);

// Inicia sincronização agendada
if (process.env.ENABLE_SYNC_SCHEDULE === 'true') {
  syncService.startScheduledSync(60); // Sincroniza a cada 60 minutos
}


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});