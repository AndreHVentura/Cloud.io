import React, { useState } from 'react';
import styled from 'styled-components';

const RedefinirSenha: React.FC = () => {
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }
    
    setError('');
    alert('Senha redefinida com sucesso!');
    // Lógica para redefinir a senha no backend (chamada API, etc)
  };

  return (
    <Container>
      <ResetForm onSubmit={handleSubmit}>
        <Title>Redefinir Senha</Title>
        <Input
          type="password"
          placeholder="Nova Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Confirmar Senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit">Redefinir Senha</Button>
      </ResetForm>
    </Container>
  );
};

export default RedefinirSenha;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url('../logo/nuvens.jpg'); /* Caminho atualizado para a imagem */
  background-size: cover;
  background-position: center;
  background-attachment: fixed; /* Efeito parallax */
`;

const ResetForm = styled.form`
  background-color: rgba(255, 255, 255, 0.8); /* Cor de fundo com transparência */
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;

  &:focus {
    border-color: #007bff;
  }
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  font-size: 14px;
`;
