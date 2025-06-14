import styled from "styled-components";

import Footer from "../pagina/Footer";


export default function ClimaContent() {
    return(
      <Container>
        <Main>
          <MainDiv>
            <ContentRow>
              <WidgetsContainer>
              </WidgetsContainer>
              <MapContainer>
              </MapContainer>
            </ContentRow>
          </MainDiv>
        </Main>
        <Footer />
      </Container>
    );
  };

const Container = styled.div`
  color: ${({ theme }) => theme.text};
  min-height: 100vh;
  font-family: "Poppins", sans-serif;
  background: ${({ theme }) => theme.body};
`;  
  
const Main = styled.main`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 4rem;
  background: ${({ theme }) => theme.body};
`;

const MainDiv = styled.div`
  max-width: 1200px;
  width: 100%;
`;

const ContentRow = styled.div`
  display: flex;
  gap: 2rem;
  align-items: flex-start;
`;

const MapContainer = styled.div`
  flex: 2;
  max-width: 900px;
  height: 700px;
  border-radius: 12px;
`;

const WidgetsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); // 2 colunas
  gap: 1rem;
  flex: 1;
`;
