import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import styled from "styled-components";

import LogoAlternativo from "../logo/icone-nuvem.png";
import SnowFlorest from "../logo/snow-florest.jpg";
import OregonLandscape from "../logo/oregon-landscape.jpg";
import RainField from "../logo/rain-field.jpg";

const images = [SnowFlorest, OregonLandscape, RainField];

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 7000);

    return () => clearInterval(interval);
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
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <InputLabel htmlFor="senha">Insira sua senha:</InputLabel>
            <InputField
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />

            <LoginButton type="submit">ENTRAR</LoginButton>
          </LoginForm>

          <SignupLink onClick={() => navigate("/cadastro")}>CADASTRE-SE AQUI!</SignupLink>
        </LoginContainer>

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
  font-family: 'Inter Tight', sans-serif;
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
