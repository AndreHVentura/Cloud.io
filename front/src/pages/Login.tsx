import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputField, InputLabel, LoginButton, LoginContainer, LoginForm, Logo, SignupLink } from "../styles/pages/login";

const Login: React.FC = () => {
  const navigate = useNavigate();
  // const [email, setEmail] = useState<string>('');
  // const [senha, setSenha] = useState<string>('');
  

  // const handleLogin = async () => {
  //   try {
  //     // Chama a API de login
  //     // const response = await api.post('/login', { mail: email, password: senha });
      
  //     // Salva o token no localStorage
  //     localStorage.setItem('token', response.data.token);

  //     // Redireciona para a página home
  //     navigate('/home');
  //   } catch (error) {
  //     console.error('Erro ao fazer login:', error);
  //     alert('Erro ao efetuar o login. Tente novamente.');
  //   }
  // };
  return (
    <LoginContainer>
      {/* <img src=""/> */}
      <Logo>cloud.<span>io</span></Logo>
      
      
      <LoginForm>
        <InputLabel>Insira seu E-mail:</InputLabel>
        <InputField 
          type="email" 
          className="email-input" 
          // value={email}
          // onChange={(e) => setEmail(e.target.value)}  
          />
        
        <InputLabel>Insira sua senha:</InputLabel>
        <InputField 
          type="password" 
          className="password-input" 
          // value={senha}
          // onChange={(e) => setSenha(e.target.value)}  
          />
        
        <LoginButton onClick={()=>navigate("")}>Entrar &gt;</LoginButton>
        
        <SignupLink onClick={() => navigate("/cadastro")}>CADASTRE-SE AQUI!</SignupLink>
        
        
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;