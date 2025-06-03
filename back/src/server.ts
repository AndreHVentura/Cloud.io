import dotenv from 'dotenv';
dotenv.config();

import connectDB from './config/db';
import userRoutes from './routes/userRoutes';
import protectedUserRouter from './routes/protectedRoutes/userRoutes';
import cors from 'cors';
import express from 'express';

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

const PORT = process.env.PORT || 5000;

connectDB();

console.log("MONGO_URI from .env:", process.env.MONGO_URI); // <- teste

app.use(express.json());

//rotas
app.use('/api/users', userRoutes);

// Rotas protegidas
app.use('/api/protected', protectedUserRouter);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
