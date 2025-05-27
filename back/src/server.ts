import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import connectDB from './config/db';
import userRoutes from './routes/userRoutes';
import protectedUserRouter from './routes/protectedRoutes/userRoutes';
import sensorRoutes from './routes/sensorRoutes';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

console.log("MONGO_URI from .env:", process.env.MONGO_URI); // <- teste

app.use(cors());
app.use(express.json());

//rotas
app.use('/api/users', userRoutes);

// Rotas protegidas
app.use('/api/protected', protectedUserRouter);

// Rota para os sensores
app.use('/api/sensors', sensorRoutes);


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});