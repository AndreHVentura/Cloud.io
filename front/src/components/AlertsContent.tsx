import styled from "styled-components";

export default function AlertsContent() {
  return(
    <AlertsMain>
      <AlertsFilterDiv>Criar um alerta de atividade meteorológica</AlertsFilterDiv>
      <AlertsMessages>Dados da estação dentro do raio de atividade</AlertsMessages>
      <AlertsMapDiv>Mapa leaflet</AlertsMapDiv>
    </AlertsMain>
  );
};

const AlertsMain = styled.main`
  height: 100vh;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-flow: column wrap;
  background-color: #f8f9fa;

   @media (max-width: 735px) {
    flex-flow: column-reverse nowrap;
  }
`;

const AlertsBaseDiv = styled.div`
  background-color: white;
  margin: 0.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const AlertsMapDiv = styled(AlertsBaseDiv)`
  width: 60%;
  height: 100%;

  @media (max-width: 735px) {
    width: auto;
  }
`;

const AlertsFilterDiv = styled(AlertsBaseDiv)`
  width: 35%;
  height: 46%;

  @media (max-width: 735px) {
    width: auto;
  }
`;

const AlertsMessages = styled(AlertsBaseDiv)`
  width: 35%;
  height: 46%;

  @media (max-width: 735px) {
    width: auto;
  }
`;