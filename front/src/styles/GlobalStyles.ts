// src/styles/GlobalStyles.ts
import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

// Estilos globais
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, sans-serif;
  }

  html, body {
    width: 100%;
    min-height: 100vh;
    background-color: #500e71;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

// Componentes reutilizáveis
export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FormWrapper = styled.div`
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #cab6d4;
  width: 24rem;
`;

export const Title = styled.h2`
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.75rem;
  border-radius: 0.25rem;
  background-color: white;
  border: 1px solid #ccc;
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  margin-top: 0.5rem;
  border-radius: 0.25rem;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;

  &.next {
    background-color: #6a0dad;
  }
  &.back {
    background-color: gray;
  }
  &.submit {
    background-color: green;
  }

  &:hover {
    opacity: 0.8;
  }
`;

export default GlobalStyle;