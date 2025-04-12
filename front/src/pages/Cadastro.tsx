import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  MainContainer,
  Container,
  Logo,
  Form,
  InputLabel,
  InputField,
  Button,
  SignupLink
} from "../styles/cadastro"; // ajuste o caminho conforme necessário

const Cadastro: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    dataNascimento: "",
    categoria: "",
    baseOperacao: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3011/register", formData);
      if (response.status === 201) {
        alert("Cadastro concluído com sucesso!");
        navigate("/home");
      }
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert("Erro ao cadastrar usuário!");
    }
  };

  return (
    <MainContainer>
      <Container>
        <Logo><span>Bom</span> Sabor</Logo>
        <Form onSubmit={handleSubmit}>
          <InputLabel htmlFor="nome">Nome</InputLabel>
          <InputField name="nome" placeholder="Digite seu nome" onChange={handleChange} required />

          <InputLabel htmlFor="email">Email</InputLabel>
          <InputField name="email" type="email" placeholder="Digite seu email" onChange={handleChange} required />

          <InputLabel htmlFor="senha">Senha</InputLabel>
          <InputField name="senha" type="password" placeholder="Digite sua senha" onChange={handleChange} required />

          <InputLabel htmlFor="dataNascimento">Data de Nascimento</InputLabel>
          <InputField name="dataNascimento" type="date" onChange={handleChange} required />

          <InputLabel htmlFor="categoria">Categoria</InputLabel>
          <InputField name="categoria" placeholder="Ex: Nutricionista, Cliente" onChange={handleChange} required />

          <InputLabel htmlFor="baseOperacao">Base de Operação</InputLabel>
          <InputField name="baseOperacao" placeholder="Ex: Unidade SP" onChange={handleChange} required />

          <Button type="submit">Cadastrar</Button>
        </Form>

        <SignupLink href="/login">Já possui conta? Faça login</SignupLink>
      </Container>
    </MainContainer>
  );
};

export default Cadastro;