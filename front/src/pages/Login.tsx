import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputField, InputLabel, LoginButton, LoginContainer, LoginForm, Logo, SignupLink } from "../styles/pages/login";
import api from "../services/api";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');

  // Função para realizar login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Previne o envio padrão do formulário

    if (!email || !senha) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      // Chama a API de login
      const response = await api.post('/login', { mail: email, password: senha });

      // Salva o token no localStorage
      localStorage.setItem('token', response.data.token);

      // Redireciona para a página home
      navigate('/home');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Erro ao efetuar o login. Tente novamente.');
    }
  };

  return (
    <LoginContainer>
      <Logo>cloud.<span>io</span></Logo>

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

        <LoginButton type="submit">Entrar &gt;</LoginButton>
      </LoginForm>

      <SignupLink onClick={() => navigate("/cadastro")}>CADASTRE-SE AQUI!</SignupLink>
    </LoginContainer>
  );
};

export default Login;
