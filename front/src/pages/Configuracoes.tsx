import { useState } from "react";
import styled from "styled-components";

export default function Configuracoes() {
  const [nomeUsuario, setNomeUsuario] = useState("joao123");
  const [senha, setSenha] = useState("");
  const [fotoPerfil, setFotoPerfil] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFotoPerfil(file);
      setPreview(URL.createObjectURL(file)); // exibir imagem antes do upload
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode enviar os dados para o backend
    console.log({ nomeUsuario, senha, fotoPerfil });
    alert("Alterações salvas!");
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h2>Configurações da Conta</h2>

        <FotoPerfil>
          <label htmlFor="foto">
            <PreviewImage src={preview || "/default-profile.png"} alt="Foto de Perfil" />
            <input type="file" id="foto" accept="image/*" onChange={handleFotoChange} />
          </label>
        </FotoPerfil>

        <InputGroup>
          <label>Nome de Usuário</label>
          <input
            type="text"
            value={nomeUsuario}
            onChange={(e) => setNomeUsuario(e.target.value)}
            required
          />
        </InputGroup>

        <InputGroup>
          <label>Nova Senha</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </InputGroup>

        <BotaoSalvar type="submit">Salvar Alterações</BotaoSalvar>
      </Form>
    </Container>
  );
}


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
  background-color: #121212;
`;

const Form = styled.form`
  background-color: #1e1e1e;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  color: white;

  h2 {
    text-align: center;
    margin-bottom: 2rem;
  }
`;

const FotoPerfil = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;

  input {
    display: none;
  }

  label {
    cursor: pointer;
  }
`;

const PreviewImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #444;
`;

const InputGroup = styled.div`
  margin-bottom: 1rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #ccc;
  }

  input {
    width: 100%;
    padding: 0.6rem;
    border: none;
    border-radius: 4px;
    background-color: #2a2a2a;
    color: white;
  }
`;

const BotaoSalvar = styled.button`
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  background-color: #4caf50;
  color: white;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;
