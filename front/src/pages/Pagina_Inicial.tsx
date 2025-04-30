import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";  // Importando o useNavigate

const Container = styled.div`
  background: linear-gradient(135deg, #0e0e1a, #1f1f2e);
  color: white;
  min-height: 100vh;
  font-family: "Poppins", sans-serif;
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 4rem;
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

const SignIn = styled.button`
  background: transparent;
  border: none;
  color: white;
  font-size: 1rem;
  cursor: pointer;
`;

const SignUp = styled.button`
  background: transparent;
  border: 1px solid white;
  padding: 0.5rem 1.2rem;
  border-radius: 6px;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: white;
    color: #0e0e1a;
  }
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const NavLink = styled.a`
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
  align-items: center;
  justify-content: space-between;
  padding: 4rem;
  min-height: 80vh;
`;

const HeroText = styled.div`
  max-width: 600px;
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

const Button = styled.button`
  background: #6366f1;
  color: white;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background: #4f46e5;
  }
`;

const HeroImage = styled.div`
  width: 400px;
  height: 400px;
  background: url("/your-image-path.png") no-repeat center/contain;
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

const HomePage = () => {
  const navigate = useNavigate();  // Use o hook useNavigate aqui

  // Função para redirecionar para a página de login
  const handleSignInClick = () => {
    navigate("/login");  // Redireciona para a página de login
  };

  return (
    <Container>
      <Navbar>
        <Logo>Logo Cloud.io</Logo>
        <NavGroup>
          <NavLinks>
            <NavLink href="/grafic">Home</NavLink>
            <NavLink href="#">Shop</NavLink>
            <NavLink href="#">About</NavLink>
            <NavLink href="#">Blog</NavLink>
          </NavLinks>

          <AuthButtons>
            <SignIn>Sign in</SignIn>
            <SignUp>Sign up</SignUp>
          </AuthButtons>
        </NavGroup>
      </Navbar>

      <Hero>
        <HeroText>
          <Title>Where Creativity Meets Innovation</Title>
          <Subtitle>Lorem ipsum dolor sit amet consectetur.</Subtitle>
          <Button onClick={handleSignInClick}>Iniciar sessão</Button>  {/* Chama a função handleSignInClick */}
        </HeroText>

        <HeroImage />
      </Hero>

      <Features>
        <FeatureCard>
          <FeatureIcon>⚡</FeatureIcon>
          <FeatureTitle>Cursus Metus</FeatureTitle>
          <FeatureDescription>
            It's fast and numbers confirm that...
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon>💎</FeatureIcon>
          <FeatureTitle>Tincidunt Ornare</FeatureTitle>
          <FeatureDescription>
            Built from scratch to be 100% compatible...
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon>🛒</FeatureIcon>
          <FeatureTitle>Quis Vulputate</FeatureTitle>
          <FeatureDescription>
            Easily build and customize your online store...
          </FeatureDescription>
        </FeatureCard>
      </Features>
    </Container>
  );
};

export default HomePage;
