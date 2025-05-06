import { NavLink } from "react-router-dom";
import styled from "styled-components";
import ImgFundo from "../logo/nuvens.jpg"
import ImgLogo from "../logo/icone-nuvem.png"

const HomePage = () => {
  return (
    <Container>
      <Hero>
        <Navbar>
          <img src={ImgLogo} alt="logo" width={"45rem"} height={"45rem"}/>
          <NavGroup>
            <NavLinks>
              <PagISNavLink to="/grafic">Gráficos</PagISNavLink>
              <PagISNavLink to="/alert">Alertas</PagISNavLink>
              <PagISNavLink to="/">Clima</PagISNavLink>
            </NavLinks>
  
            <AuthButtons>
              <BotaoLogin to="/login">Login</BotaoLogin>
              <BotaoCadastro to="/cadastro">Cadastrar</BotaoCadastro>
            </AuthButtons>
          </NavGroup>
        </Navbar>

      
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

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 4rem;
  width: 100%;
  height: 4rem;
`;

const NavGroup = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const BotaoLogin = styled(NavLink)`
  background: transparent;
  border: none;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  text-decoration: none;
  padding-top: 8px;
  transition: 0.3s;

  &:hover {
    color: #8b5cf6
  }
`;

const BotaoCadastro = styled(NavLink)`
  background: transparent;
  border: 1px solid white;
  padding: 0.5rem 1.2rem;
  border-radius: 6px;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
  text-decoration: none;

  &:hover {
    background: white;
    color: #0e0e1a;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const PagISNavLink = styled(NavLink)`
  text-decoration: none;
  color: white;
  font-weight: 500;
  transition: 0.3s;

  &:hover {
    color: #8b5cf6;
  }
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
