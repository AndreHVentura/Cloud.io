import styled from "styled-components";

const MainContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: center;
  background-color: rgb(55, 82, 218);
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;  /* Para ocupar toda a altura da tela */
  background-color: #f4f6f9;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  border-radius: 10px;
`;

const Logo = styled.h1`
  font-size: 3rem;
  color: #333;
  font-weight: bold;
  margin-bottom: 2rem;
  
  span {
    color: #0066cc;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 400px;  /* Limita a largura para evitar que o formulário fique muito largo */
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px;

  @media (max-width: 768px) {
    max-width: 90%;
  }
`;

const InputLabel = styled.label`
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: #555;
`;

const InputField = styled.input`
  padding: 1rem;
  margin-bottom: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #0066cc;
    box-shadow: 0 0 0 2px rgba(0, 102, 204, 0.2);
  }

  &::placeholder {
    color: #888;
  }
`;

const LoginButton = styled.button`
  padding: 1rem;
  background-color: #0066cc;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #0052a3;
    transform: translateY(-2px);
  }

  &:active {
    background-color: #004080;
    transform: translateY(0);
  }
`;

const SignupLink = styled.a`
  margin-top: 1.5rem;
  color: #0066cc;
  text-decoration: none;
  font-weight: bold;
  text-align: center;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

export { 
  MainContainer,
  LoginContainer, 
  Logo, 
  LoginForm, 
  InputLabel, 
  InputField, 
  LoginButton, 
  SignupLink 
};
