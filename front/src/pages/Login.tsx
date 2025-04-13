import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputField, InputLabel, LoginButton,
         LoginContainer, LoginForm, Logo,
         SignupLink, MainContainer } from "../styles/pages/login";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Usando o contexto
  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');

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
      login(response.data.token); // Usando a função do contexto
      navigate('/home');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Credenciais inválidas ou erro no servidor.');
    }
  };

  return (
    <MainContainer>
    <LoginContainer>
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
    </MainContainer>
  );
};

export default Login;
