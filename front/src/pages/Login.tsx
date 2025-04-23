import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import styled from "styled-components";

// Importação das imagens da pasta logo
import LogoAlternativo from "../logo/icone-nuvem.png";
import SnowFlorest from "../logo/snow-florest.jpg";
import OregonLandscape from "../logo/oregon-landscape.jpg";
import RainField from "../logo/rain-field.jpg";

// Array de imagens para o carrossel
const images = [SnowFlorest, OregonLandscape, RainField];

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  // Função para realizar login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!email || !senha) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
  
    try {
      const response = await api.post('/api/users/login', { 
        email: email,
        password: senha 
      });
      console.log('Login bem-sucedido:', response.data);
      localStorage.setItem('token', response.data.token);
      login(response.data.token);
      navigate('/home');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Credenciais inválidas ou erro no servidor.');
    }
  };

  // Efeito para trocar de imagem automaticamente
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Troca de imagem a cada 3 segundos

    return () => clearInterval(interval); // Limpar o intervalo quando o componente for desmontado
  }, []);

  return (
    <MainContainer>
      <Container>
        <LoginContainer>
          <LogoImage src={LogoAlternativo} alt="Logo Alternativo" />
          <Logo>Cloud.<span>io</span></Logo>

          <LoginForm onSubmit={handleLogin}>
            <InputLabel htmlFor="email">Insira seu E-mail:</InputLabel>
            <InputField
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Atualiza o estado do email
              required
            />

            <InputLabel htmlFor="senha">Insira sua senha:</InputLabel>
            <InputField
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)} // Atualiza o estado da senha
              required
            />

            <LoginButton type="submit">ENTRAR</LoginButton>
          </LoginForm>

          <SignupLink onClick={() => navigate("/cadastro")}>CADASTRE-SE AQUI!</SignupLink>
        </LoginContainer>

        <ImageContainer>
          <img src={images[currentImageIndex]} alt={`imagem-login-${currentImageIndex}`} />
        </ImageContainer>
      </Container>
    </MainContainer>
  );
};

export default Login;

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
  height: 100vh;
  width: 100%;
`;

const LoginContainer = styled.div`
  flex: 1;
  background-color: #0e2843;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.h1`
  margin-top: 10px;
  color: white;
  font-size: 2.5rem;
  span {
    color: #0066cc;
  }
`;

const LogoImage = styled.img`
  width: 120px; 
  margin-bottom: 5px; 
  object-fit: contain;
`;

const LoginForm = styled.form`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
`;

const InputLabel = styled.label`
  color: white;
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
  width: 100%;
`;

const LoginButton = styled.button`
  align-self: center;
  padding: 10px;
  width: 55%;
  background-color: #4caf50;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

const SignupLink = styled.p`
  margin-top: 10px;
  font-size: 1rem;
  color: #0073e6;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
