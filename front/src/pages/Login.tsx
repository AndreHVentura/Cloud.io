import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import styled from "styled-components";
import LogoAlternativo from "../logo/icone-nuvem.png";
import lagoFurnas from "../logo/lago_furnas.jpg";
import capitolio from "../logo/capitolio.jpg";
import nuvens from "../logo/nuvens.jpg";

const images = [lagoFurnas, capitolio, nuvens];

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
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <MainContainer>
      <Container>
        <LoginContainer>
          <LogoImage src={LogoAlternativo} alt="Logo Alternativo" />
          <Logo>Cloud.<span>io</span></Logo>

          <LoginForm onSubmit={handleLogin}>
            <InputLabel htmlFor="email">E-mail:</InputLabel>
            <InputField type="email" id="email" placeholder="Insira seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />

            <InputLabel htmlFor="senha">Senha:</InputLabel>
            <InputField type="password" id="senha" placeholder="Insira sua senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />

            <OptionsRow>
              <CheckboxWrapper>
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Manter conectado</label>
              </CheckboxWrapper>
              <PasswordLink onClick={() => navigate("/recuperar-senha")}>
                Esqueceu sua senha?
              </PasswordLink>
            </OptionsRow>

            <LoginButton type="submit">ENTRAR</LoginButton>
          </LoginForm>
          <RegisterText>
            Não possui conta? Cadastre-se<SignupLink onClick={() => navigate("/cadastro")}> aqui!</SignupLink>
          </RegisterText>
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
  max-width: 33.33%;
  background-color: #ffffff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

const LoginForm = styled.form`
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

const LoginButton = styled.button`
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

const OptionsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;

  input {
    margin-right: 6px;
  }

  label {
    color: #232323;
    font-size: 0.95rem;
  }
`;

const PasswordLink = styled.p`
  color: #0073e6;
  font-size: 0.95rem;
  cursor: pointer;
  &:hover {
    text-decoration: none;
  }
`;

const RegisterText = styled.p`
  margin-top: 20px;
  color: #232323;
  font-size: 1rem;
  text-align: center;
  display: inline;
`;

const SignupLink = styled.p`
  margin-top: 10px;
  font-weight: bold;
  font-size: 1rem;
  color: #0073e6;
  cursor: pointer;
  display: inline;
  &:hover {
    text-decoration: none;
  }
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
