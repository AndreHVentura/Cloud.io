import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen"; // Importe o componente LoadingScreen
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
import api from "../services/api";

const Cadastro: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    dataNascimento: "",
    c_password: ""
  });
  
  const [loading, setLoading] = useState(false); // Estado para controlar a tela de loading
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  console.log(formData);
  const Verificar = (): boolean => {
    setLoading(false);
    if (formData.password !== formData.c_password) {
      window.alert(
        "As senhas não estão batendo, por favor, verifique se as senhas são correspondentes"
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Ativa a tela de carregamento ao iniciar o cadastro
    if (Verificar()){
    try {
      const response = await api.post('api/users/register', formData);
      if (response.status === 201) {
        alert("Cadastro concluído com sucesso!");
        setLoading(false); // Desativa a tela de carregamento após o cadastro
        navigate("/home");
      }
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert("Erro ao cadastrar usuário!");
      setLoading(false); // Desativa a tela de carregamento se houver erro
    }
  }
  };

  return loading ? (
    <LoadingScreen /> // Exibe a LoadingScreen enquanto o estado `loading` for true
  ) : (
    <MainContainer>
      <Container>
        <Logo>Cloud.<span>io</span></Logo>
        <Form onSubmit={handleSubmit}>
          <InputLabel htmlFor="nome">Nome</InputLabel>
          <InputField name="name" placeholder="Digite seu nome" onChange={handleChange} required />

          <InputLabel htmlFor="email">Email</InputLabel>
          <InputField name="email" type="email" placeholder="Digite seu email" onChange={handleChange} required />

          <InputLabel htmlFor="senha">Senha</InputLabel>
          <InputField name="password" type="password" placeholder="Digite sua senha" onChange={handleChange} required />
          <InputLabel htmlFor="confirmar senha">Confirme seu senha</InputLabel>
          <InputField name="c_password" type="password" placeholder="Digite sua senha novamente" onChange={handleChange} required />


          <Button onClick={handleSubmit}>Cadastrar</Button>
        </Form>

        <SignupLink href="/">Já possui conta? Faça login</SignupLink>
      </Container>
    </MainContainer>
  );
};

export default Cadastro;
