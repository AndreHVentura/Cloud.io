import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from "react-router-dom";
import Logo_cloud from "../logo/Logo_cloud.png";
import lagoFurnas from "../logo/lago_furnas.jpg";
import capitolio from "../logo/capitolio.jpg";
import nuvens from "../logo/nuvens.jpg";
import LoadingCircleSpinner from "../components/perfil/LoadingScreen";

const images = [lagoFurnas, capitolio, nuvens];

const RedefinirSenha: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    setError('');
    alert("Senha redefinida com sucesso!");
    // TODO: chamar API para redefinir a senha
  };

  return (
    <MainContainer>
      <Container>
        <FormContainer>
          <LogoImage src={Logo_cloud} alt="Logo Cloud" />
          <Logo>Cloud.<span>io</span></Logo>

          <Form onSubmit={handleSubmit}>
            <InputLabel>Nova Senha</InputLabel>
            <InputField
              type="password"
              placeholder="Digite sua nova senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <InputLabel>Confirmar Nova Senha</InputLabel>
            <InputField
              type="password"
              placeholder="Confirme sua nova senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <SubmitButton type="submit">Redefinir Senha</SubmitButton>
            <BackLink to="/Login">← Voltar para o login</BackLink>
          </Form>
        </FormContainer>

        <ImageContainer>
          {images.map((img, index) => (
            <CarouselImage
              key={index}
              src={img}
              alt={`background-${index}`}
              isVisible={index === currentImageIndex}
            />
          ))}
        </ImageContainer>
      </Container>
    </MainContainer>
  );
};

export default RedefinirSenha;

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

const BackLink = styled(Link)`
  margin-top: 10px;
  text-align: center;
  font-size: 0.9rem;
  color: #0073e6;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const FormContainer = styled.div`
  width: 30%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 80px;
`;

const LogoImage = styled.img`
  width: 70%;
  margin-bottom: 20px;
  object-fit: contain;
`;

const Logo = styled.h1`
  margin-top: -140px;
  font-size: 2.5rem;
  font-family: 'Inter Tight', sans-serif;
  background: linear-gradient(to right, #0073e6, #00cc66);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Form = styled.form`
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

const SubmitButton = styled.button`
  color: white;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  background: linear-gradient(90deg, #2A7B9B, #57C785);
  transition: background 0.5s;

  &:hover {
    background: linear-gradient(90deg, #57C785, #EDDD53);
  }
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  font-size: 14px;
  margin-bottom: 10px;
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

