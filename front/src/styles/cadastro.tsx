import styled from "styled-components";

// Contêiner principal (garante que o layout ocupe toda a tela e se ajuste ao tamanho)
const MainContainer = styled.div`
  display: flex;
  flex-direction: column; // Permite que o logo fique em cima e o conteúdo vá para baixo
  min-height: 100vh; // Permite crescer além da altura da tela
  width: 100vw;
  align-items: center;
  justify-content: flex-start; // Alinha o conteúdo ao topo
  background-color: rgb(7, 78, 120);
  padding: 0px;
  margin: 0px;
  box-sizing: border-box;
  overflow-y: auto; // Permite rolagem vertical

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

// Container do login (vai centralizar o conteúdo e adaptar conforme a tela)
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 500px;  /* Limita a largura em telas grandes */
  height: auto;
  background-color: #0c1f2e;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  border-radius: 10px;
  box-sizing: border-box;
  margin-top: 2rem; // dá espaço para o Logo e afasta o formulário do topo
  margin-bottom: 2rem;;

  @media (max-width: 1024px) and (min-width: 768px) {
    max-width: 700px;  // Mais largura para tablets
    padding: 30px 20px; // Mais espaçamento para tablets
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 20px 15px; // Ajuste de padding para telas pequenas
  }

  @media (max-width: 480px) {
    max-width: 100%; // Faz com que o container ocupe 100% da tela
  }
`;

// Logo com cor dinâmica e tamanho ajustável
const Logo = styled.h1`
  font-size: 3rem;
  color: white;
  font-weight: bold;
  margin-bottom: 2rem;
  
  span {
    color: #0066cc;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem; // Reduzindo o tamanho da logo em telas pequenas
  }

  @media (max-width: 480px) {
    font-size: 2rem; // Font menor ainda para telas muito pequenas
  }
`;

// Estilo do formulário de login
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;  /* Limita a largura do formulário */
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  box-sizing: border-box;

  @media (max-width: 1024px) and (min-width: 768px) {
    max-width: 650px;  // Formulário mais largo para tablets
    padding: 2.5rem;
  }

  @media (max-width: 768px) {
    max-width: 100%;  // O formulário pode usar 100% da largura disponível em telas pequenas
  }

  @media (max-width: 480px) {
    padding: 1.5rem; // Ajuste de padding para dispositivos móveis
  }
`;

// Estilo do rótulo do input
const InputLabel = styled.label`
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: #555;
`;

// Estilo do campo de input (com bordas arredondadas e foco)
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

  @media (max-width: 480px) {
    padding: 0.9rem;  // Ajustando o padding em telas muito pequenas
  }
`;

// Estilo do botão de login (com transição suave)
const Button = styled.button`
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

  @media (max-width: 768px) {
    padding: 0.8rem;  // Ajustando o padding para telas menores
  }
`;

// Estilo do link para cadastro (com ajuste de fonte e estilo)
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
    font-size: 0.9rem;  // Menor tamanho de fonte em telas pequenas
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;  // Ajuste para telas muito pequenas
  }
`;

export { 
  MainContainer,
  Container, 
  Logo, 
  Form, 
  InputLabel, 
  InputField, 
  Button, 
  SignupLink 
};
