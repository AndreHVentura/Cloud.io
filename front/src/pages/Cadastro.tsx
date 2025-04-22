import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
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
import { useCreateUser } from "../context/CreateAccountContext";


interface FormData {
  name: string;
  email: string;
  password: string;
  dataNascimento: string;
  role: string;
  baseOperacao: string;
}

const Cadastro: React.FC = () => {
  /*const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    dataNascimento: "",
    role: "",
    baseOperacao: "",
  });*/
  const [loading, setLoading] = useState(false); // Estado para controlar a tela de loading

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()
  
  const navigate = useNavigate();
  const {createAccountData, createAccountError, createAccountSuccess} = useCreateUser();

  const onSubmit: SubmitHandler<FormData> = ({ email, password, name, role }) => {
    createAccountData({ email, password, name, role:'admin' });
    if (createAccountError) {
      console.warn('Erro');
    } else {
      navigate("/")
    }
  };

  

  /*const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('element: ', e)
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };*/

  //console.log(formData);

  return loading ? (
    <LoadingScreen /> // Exibe a LoadingScreen enquanto o estado `loading` for true
  ) : (
    <MainContainer>
      <Container>
        <Logo>Cloud.<span>io</span></Logo>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputLabel htmlFor="nome">Nome</InputLabel>
          <InputField {...register("name", {required:true})} placeholder="Digite seu nome" />

          <InputLabel htmlFor="email">Email</InputLabel>
          <InputField {...register("email", {required: true})} type="email" placeholder="Digite seu email"  required />

          <InputLabel htmlFor="senha">Senha</InputLabel>
          <InputField {...register("password", {required: true})} type="password" placeholder="Digite sua senha"  required />

          <InputLabel htmlFor="dataNascimento">Data de Nascimento</InputLabel>
          <InputField {...register("dataNascimento", {required: true})} type="date"  required />

          <InputLabel htmlFor="categoria">Categoria</InputLabel>
          <InputField {...register("role", {required: true})} placeholder="Ex: Administrador, Cliente"  required />

          <InputLabel htmlFor="baseOperacao">Base de Operação</InputLabel>
          <InputField {...register("baseOperacao", {required: true})} placeholder="Ex: Unidade SP" required />

          <Button type="submit">Cadastrar</Button>
        </Form>

        <SignupLink href="/">Já possui conta? Faça login</SignupLink>
      </Container>
    </MainContainer>
  );
};

export default Cadastro;