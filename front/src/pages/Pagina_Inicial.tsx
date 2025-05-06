import { NavLink } from "react-router-dom";
import styled from "styled-components";
import ImgFundo from "../logo/nuvens.jpg"
import NavbarPI from "../components/perfil/NavbarPI";

const HomePage = () => {
  return (
    <Container>
      <Hero>
        <NavbarPI />

        <HeroText>
          <Title>Cloud.IO</Title>
          <Subtitle>Plataforma para monitorar o clima.</Subtitle>
          <BotaoIniciarSessao to="/login">Iniciar sessão</BotaoIniciarSessao>
        </HeroText>
      </Hero>

      <Features>
        <FeatureCard>
          <FeatureIcon>O</FeatureIcon>
          <FeatureTitle>Placeholder</FeatureTitle>
          <FeatureDescription>
            Descrição sobre o projeto
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon>O</FeatureIcon>
          <FeatureTitle>Placeholder</FeatureTitle>
          <FeatureDescription>
          Descrição sobre o projeto
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon>O</FeatureIcon>
          <FeatureTitle>Placeholder</FeatureTitle>
          <FeatureDescription>
            Descrição sobre o projeto
          </FeatureDescription>
        </FeatureCard>
      </Features>
    </Container>
  );
};

export default HomePage;

const Container = styled.div`
  color: white;
  min-height: 100vh;
  font-family: "Poppins", sans-serif;
`;

const Hero = styled.section`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  min-height: 85vh;
  background: url(${ImgFundo}) no-repeat; 
`;

const HeroText = styled.div`
  padding-left: 4rem;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 3rem;
  line-height: 1.2;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

const BotaoIniciarSessao = styled(NavLink)`
  background: #6366f1;
  color: white;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background: #4f46e5;
  }
`;

const Features = styled.section`
  background: white;
  color: black;
  display: flex;
  justify-content: center;
  gap: 3rem;
  padding: 4rem 2rem;
`;

const FeatureCard = styled.div`
  text-align: center;
  max-width: 300px;
`;

const FeatureIcon = styled.div`
  background: #6366f1;
  width: 60px;
  height: 60px;
  margin: 0 auto 1rem auto;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
`;

const FeatureTitle = styled.h3`
  margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
`;
