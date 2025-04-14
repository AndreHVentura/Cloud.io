import express from 'express';
import connectDB from './config/db';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import protectedUserRouter from './routes/protectedRoutes/userRoutes';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

//rotas
app.use('/api/users', userRoutes);

// Rotas protegidas
app.use('/api/protected', protectedUserRouter);


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});