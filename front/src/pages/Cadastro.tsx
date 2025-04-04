import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import GlobalStyle, { Container, FormWrapper, Title, Input, Button } from "../styles/GlobalStyles";

interface CadastroInicialProps {
  onNext: (data: { nome: string; email: string; senha: string; dataNascimento: string }) => void;
}

const CadastroInicial: React.FC<CadastroInicialProps> = ({ onNext }) => {
  const [formData, setFormData] = useState<{ nome: string; email: string; senha: string; dataNascimento: string }>({
    nome: "",
    email: "",
    senha: "",
    dataNascimento: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
        <Container>
          <FormWrapper>
            <Title>Cadastro</Title>
            <Input name="nome" placeholder="Nome" onChange={handleChange} />
            <Input name="email" placeholder="Email" onChange={handleChange} />
            <Input type="password" name="senha" placeholder="Senha" onChange={handleChange} />
            <Input type="date" name="dataNascimento" onChange={handleChange} />
            <Button className="next" onClick={() => onNext(formData)}>Próximo</Button>
          </FormWrapper>
        </Container>
  );
};

interface CadastroFinalProps {
  onBack: () => void;
  onSubmit: (data: { categoria: string; baseOperacao: string }) => void;
}

const CadastroFinal: React.FC<CadastroFinalProps> = ({ onBack, onSubmit }) => {
  const [formData, setFormData] = useState<{ categoria: string; baseOperacao: string }>({
    categoria: "",
    baseOperacao: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Cadastro</Title>
        <Input name="categoria" placeholder="Categoria de Usuário" onChange={handleChange} />
        <Input name="baseOperacao" placeholder="Base de Operação" onChange={handleChange} />
        <Button className="back" onClick={onBack}>Voltar</Button>
        <Button className="submit" onClick={() => onSubmit(formData)}>Finalizar Cadastro</Button>
      </FormWrapper>
    </Container>
  );
};

const Cadastro = () => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState<{ nome?: string; email?: string; senha?: string; dataNascimento?: string }>({});

  const handleNext = (data: { nome: string; email: string; senha: string; dataNascimento: string }) => {
    setUserData(data);
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = async (finalData: { categoria: string; baseOperacao: string }) => {
    const completeData = { ...userData, ...finalData };

    try {
      const response = await axios.post("http://localhost:3011/register", completeData);
      if (response.status === 201) {
        alert("Cadastro concluído com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert("Erro ao cadastrar usuário!");
    }
  };

  return step === 1 ? <CadastroInicial onNext={handleNext} /> : <CadastroFinal onBack={handleBack} onSubmit={handleSubmit} />;
};

export default Cadastro;