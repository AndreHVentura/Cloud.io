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
    c_password: "",
    city:""
  });
  
  const [loading, setLoading] = useState(false); // Estado para controlar a tela de loading
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  console.log(formData);
  const Verificar = (): boolean => {
    setLoading(false);
  
    if (!formData.city || formData.city.trim() === "") {
      window.alert("Por favor, selecione uma cidade.");
      return false;
    }
  
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
          {/* <InputLabel htmlFor="city">Qual sua cidade?</InputLabel>
          <InputField name="city" placeholder="Ex:Aguanil" onChange={handleChange} required /> */}
          <InputLabel htmlFor="city">Cidade:</InputLabel>
          <select id="city" name="city" onChange={handleChange}>
            <option value={""}>Selecione sua cidade</option>
            <option value={"Aguanil"}>Aguanil</option>
            <option value={"Alfenas"}>Alfenas</option>
            <option value={"Alpinópolis"}>Alpinópolis</option>
            <option value={"Alterosa"}>Alterosa</option>
            <option value={"Areado"}>Areado</option>
            <option value={"Boa_Esperança"}>Boa Esperança</option>
            <option value={"Cabo_Verde"}>Cabo Verde</option>
            <option value={"Camacho"}>Camacho</option>
            <option value={"Campo_Belo"}>Campo Belo</option>
            <option value={"Campo_do_Meio"}>Campo do Meio</option>
            <option value={"Campos_Gerais"}>Campos Gerais</option>
            <option value={"Cana_Verde"}>Cana Verde</option>
            <option value={"Candeias"}>Candeias</option>
            <option value={"Capitólio"}>Capitólio</option>
            <option value={"Carmo_do_Rio_Claro"}>Carmo do Rio Claro</option>
            <option value={"Conceição_da_Aparecida"}>Conceição da Aparecida</option>
            <option value={"Coqueiral"}>Coqueiral</option>
            <option value={"Cristais"}>Cristais</option>
            <option value={"Divisa_Nova"}>Divisa Nova</option>
            <option value={"Elói_Mendes"}>Elói Mendes</option>
            <option value={"Fama"}>Fama</option>
            <option value={"Formiga"}>Formiga</option>
            <option value={"Guapé"}>Guapé</option>
            <option value={"Ilicínea"}>Ilicínea</option>
            <option value={"Itaú_de_Minas"}>Itaú de Minas</option>
            <option value={"Juruaia"}>Juruaia</option>
            <option value={"Lavras"}>Lavras</option>
            <option value={"Luminárias"}>Luminárias</option>
            <option value={"Machado"}>Machado</option>
            <option value={"Mato_Verde"}>Mato Verde</option>
            <option value={"Nova_Resende"}>Nova Resende</option>
            <option value={"Passos"}>Passos</option>
            <option value={"São_João_Batista_do_Glória"}>São João Batista do Glória</option>
            <option value={"São_José_da_Barra"}>São José da Barra</option>
          </select>

          <Button onClick={handleSubmit}>Cadastrar</Button>
        </Form>

        <SignupLink href="/">Já possui conta? Faça login</SignupLink>
      </Container>
    </MainContainer>
  );
};

export default Cadastro;
