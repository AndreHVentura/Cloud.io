import styled from "styled-components";

const Footer = () => {
  return (
    <FooterContainer>
      <p>&copy; {new Date().getFullYear()} Cloud.IO — Todos os direitos reservados.</p>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  background-color: #1f1f2e;
  color: white;
  text-align: center;
  padding: 2rem 1rem;
  font-size: 0.9rem;
  margin-top: 4rem;
`;