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
          <FeatureIcon>🌩</FeatureIcon>
          <FeatureTitle>Quem somos</FeatureTitle>
          <FeatureDescription>
            Somos uma equipe de desenvolvedores de websites focados em criar plataformas digitais intuitivas e funcionais, sempre com o objetivo de otimizar a experiência do usuário
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon>⚙</FeatureIcon>
          <FeatureTitle>O projeto</FeatureTitle>
          <FeatureDescription>
            Este projeto é um site meteorológico que monitora e identifica fortes ventos em tempo real, oferecendo alertas precisos para ajudar os usuários a se prepararem e se protegerem contra condições climáticas adversas
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon>✔</FeatureIcon>
          <FeatureTitle>Objetivo</FeatureTitle>
          <FeatureDescription>
            Fornecer informações relevantes à população sobre os ventos na região de Furnas, com o objetivo de prevenir situações de alto risco e garantir a segurança da comunidade
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
  @property --myColor1 {
    syntax: '<color>';
    initial-value: #2A7B9B;
    inherits: false;
  }
  
  @property --myColor2 {
    syntax: '<color>';
    initial-value: #57C785;
    inherits: false;
  }

  color: white;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  text-decoration: none;
  background: linear-gradient(90deg, var(--myColor1), var(--myColor2));
  transition: --myColor1 500ms, --myColor2 500ms;

  &:hover {
    --myColor1: #57C785;
    --myColor2: #EDDD53;
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
  background: #2A7B9B;
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
