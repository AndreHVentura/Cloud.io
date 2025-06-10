import { NavLink } from "react-router-dom";
import styled from "styled-components";
import ImgFundo from "../logo/Logo_cloud.png"
import imgMapa from "../logo/lago_furnas.jpg";
import imgLago from "../logo/capitolio.jpg";
import imgCeu from "../logo/nuvens.jpg";
import NavbarPI from "../components/perfil/NavbarPI";
import Footer from "../components/pagina/Footer";

const HomePage = () => {
  return (
    <Container>
      <Hero>
        <NavbarPI />
        <HeroContent>
          <HeroText>
            <HeroImageLogo src={ImgFundo} alt="Logo nuvem" />
            <Title>Cloud.IO</Title>
            <Subtitle>Plataforma para monitorar o clima.</Subtitle>
            <BotaoIniciarSessao to="/login">Iniciar sessão</BotaoIniciarSessao>
          </HeroText>
        </HeroContent>
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

      <ImagemSecao>
        <ImagemItem>
            <Imagem src={imgMapa} alt="Lago de Furnas" />
          <TextoImagem>
            <h2>Mapa da região</h2>
            <p>O Lago de Furnas é monitorado por três estações meteorológicas estrategicamente posicionadas. Essa visualização geográfica é essencial para compreender a extensão da área afetada por ventos extremos e para orientar ações preventivas.</p>
          </TextoImagem>
        </ImagemItem>
        <ImagemItem $reverse={true}>
          <Imagem src={imgLago} alt="Capitólio" />
          <TextoImagem>
            <h2>Apoio aos navegantes</h2>
            <p>Os cânions de Capitólio são um importante destino turístico. Monitorar o clima e emitir alertas em tempo real ajuda a proteger vidas e garantir que moradores e visitantes possam desfrutar da região com segurança.</p>
          </TextoImagem>
        </ImagemItem>
        <ImagemItem>
          <Imagem src={imgCeu} alt="Nuvens" />
          <TextoImagem>
            <h2>Condições atmosféricas</h2>
            <p>As estações meteorológicas captam alterações nas condições atmosféricas, como formações de nuvens e ventos intensos. Esses dados são analisados para gerar alertas precisos sobre riscos à navegação e eventos extremos.</p>
          </TextoImagem>
        </ImagemItem>
      </ImagemSecao>
      <Footer />
    </Container>
  );
};

export default HomePage;

const Container = styled.div`
  color: white;
  min-height: 100vh;
  font-family: "Poppins", sans-serif;
  background: linear-gradient(135deg, #0e0e1a, #1f1f2e);
`;

const Hero = styled.section`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  min-height: 85vh;
`;

const HeroText = styled.div`
  flex: 1;
  padding-left: 4rem;
  width: 100%;
`;

const HeroContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  padding: 4rem;
  @media (max-width: 768px) {
  flex-direction: column;
  text-align: center;
  }
`;

const HeroImageLogo = styled.img`
  height: 500px;
  object-fit: contain;
  margin-bottom: -250px;
  margin-top: -200px;
`;

const Title = styled.h1`
  font-size: 7rem;
  line-height: 1.2;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
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
  font-weight:bold;
  text-transform:uppercase;
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

const ImagemSecao = styled.section`
  background: ${({ theme }) => theme.backgroundGradient};
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

const ImagemItem = styled.div<{ $reverse?: boolean }>`
  display: flex;
  flex-direction: ${({ $reverse }) => ($reverse ? "row-reverse" : "row")};
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Imagem = styled.img`
  flex: 1;
  max-width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 12px;
`;

const TextoImagem = styled.div`
  flex: 1;
  color: ${({ theme }) => theme.text};
  padding: 1rem;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
  }

  p {
    font-size: 1rem;
    line-height: 1.5;
  }
`;