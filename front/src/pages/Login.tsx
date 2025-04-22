import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputField, InputLabel, LoginButton,
         LoginContainer, LoginForm, Logo,
         SignupLink, MainContainer } from "../styles/login";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { errorMessage, userLogin } = useAuth(); // Usando o contexto
  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');

  // Função para realizar login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    userLogin({ email, password: senha }); // Chama a função de login do contexto
  };
  useEffect(() => {
    if (errorMessage !== '') {
      alert(`Erro ao fazer login: ${errorMessage}`); // Exibe mensagem de erro
    } else {
      // Se não houver erro, redireciona para a página inicial
      navigate("/home");
    }
  }
  , [errorMessage, navigate]); // Adiciona errorMessage como dependência

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
