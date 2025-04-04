require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT || 3011;

app.use(express.json());
app.use(cors());

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB conectado!"))
  .catch(err => console.log("Erro ao conectar ao MongoDB:", err));

// Modelo do usuário
const UserSchema = new mongoose.Schema({
  nome: String,
  email: String,
  senha: String,
  dataNascimento: String,
  categoria: String,
  baseOperacao: String
});

const User = mongoose.model("User", UserSchema);

// Rota de cadastro
app.post("/register", async (req, res) => {
  try {
    console.log("Recebendo dados:", req.body); // Verifica os dados recebidos

    const { nome, email, senha, dataNascimento, categoria, baseOperacao } = req.body;
    if (!nome || !email || !senha) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios!" });
    }

    const usuarioExistente = await User.findOne({ email });
    if (usuarioExistente) return res.status(400).json({ message: "Email já cadastrado!" });

    const hashedPassword = await bcrypt.hash(senha, 10);
    console.log("Senha criptografada com sucesso!");

    const newUser = new User({ nome, email, senha: hashedPassword, dataNascimento, categoria, baseOperacao });

    await newUser.save();
    console.log("Usuário salvo no banco de dados!");

    res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
  } catch (error) {
    console.error("Erro no servidor:", error); // Log do erro
    res.status(500).json({ message: "Erro no servidor", error });
  }
});

// Iniciar servidor
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));