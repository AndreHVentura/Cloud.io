import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/perfil/LoadingScreen";
import styled from "styled-components";
import LogoAlternativo from "../logo/icone-nuvem.png";
import lagoFurnas from "../logo/lago_furnas.jpg";
import capitolio from "../logo/capitolio.jpg";
import nuvens from "../logo/nuvens.jpg";

const images = [lagoFurnas, capitolio, nuvens];

const Cadastro: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    dataNascimento: "",
    c_password: "",
    city: ""
  });
  
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);


  return loading ? (
    <LoadingScreen /> // Exibe a LoadingScreen enquanto o estado `loading` for true
  ) : (
    <MainContainer>
      <Container>
        <LogoImage src={LogoAlternativo} alt="Logo Alternativo" />
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

          <InputLabel htmlFor="city">Cidade:</InputLabel>
          <SelectField name="city" onChange={handleChange} required>
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
          </SelectField>

          <Button type="submit">Cadastrar</Button>
        </Form>
        <ImageContainer>
          {images.map((imgSrc, index) => (
            <CarouselImage
              key={index}
              src={imgSrc}
              alt={`imagem-login-${index}`}
              isVisible={index === currentImageIndex}
            />
          ))}
        </ImageContainer>
      </Container>
    </MainContainer>
  );
};
  
export default Cadastro;

// Styled Components

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column; /* para empilhar logo + formulário */
  height: 100vh;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const ImageContainer = styled.div`
  flex: 2.5;
  position: relative;
  overflow: hidden;
`;

const CarouselImage = styled.img<{ isVisible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: opacity 1s ease-in-out;
  pointer-events: none;
`;

const Logo = styled.h1`
  margin-top: 10px;
  font-size: 2.5rem;
  font-family: 'Inter Tight', sans-serif;
  background: linear-gradient(to right, #0073e6, #00cc66);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
`;

const LogoImage = styled.img`
  width: 120px;
  margin-bottom: 5px;
  object-fit: contain;
`;

const Form = styled.form`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
`;

const InputLabel = styled.label`
  color: #232323;
  margin-bottom: 8px;
  font-size: 1rem;
  font-weight: bold;
`;

const InputField = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  width: 90%;
`;

const SelectField = styled.select`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  width: 95%;
`;

const Button = styled.button`
  align-self: center;
  padding: 10px;
  width: 55%;
  background-color: #00e074;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #4eee81;
  }
`;
