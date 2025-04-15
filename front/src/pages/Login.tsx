import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import styled from "styled-components";

// 🖼️ Imagem local como fundo
import imagem1 from "../logo/snow-florest.jpg";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');

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

  return (
    <MainContainer>
      <Container>
        {/* Painel Esquerdo - Login */}
        <LoginContainer>
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

          <SignupLink onClick={() => navigate("/cadastro")}>
            CADASTRE-SE AQUI!
          </SignupLink>
        </LoginContainer>

        {/* Painel Direito com imagem de fundo */}
        <ImagesContainer />
      </Container>
    </MainContainer>
  );
};

export default Login;

const MainContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;

const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

const LoginContainer = styled.div`
  flex: 1;
  background-color: #f0f0f0;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
  span {
    color: #4caf50;
  }
`;

const LoginForm = styled.form`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
`;

const InputLabel = styled.label`
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
  padding: 10px;
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

// 🔥 Estilo do container com imagem de fundo
const ImagesContainer = styled.div`
  flex: 1;
  background-image: url(${imagem1});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100%;
`;
