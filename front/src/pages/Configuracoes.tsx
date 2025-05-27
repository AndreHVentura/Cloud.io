import { useState } from "react";
import styled from "styled-components";
import topoImage from "../logo/nuvens.jpg";

export default function Configuracoes() {
  const [nomeUsuario, setNomeUsuario] = useState("joao123");
  const [senha, setSenha] = useState("");
  const [fotoPerfil, setFotoPerfil] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFotoPerfil(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Alterações salvas!");
  };

  return (
    <PageContainer>
      <TopImageContainer>
        <TopImage src={topoImage} alt="Imagem de topo" />
        {/* O card flutua sobre a imagem */}
        <FloatingCard>
          <Logo src="/logo-cloudy.png" alt="Logo" />

          <Form onSubmit={handleSubmit}>
            {preview && <PreviewImage src={preview} alt="Foto de perfil" />}
            <label htmlFor="foto">
              <InputFile
                type="file"
                id="foto"
                accept="image/*"
                onChange={handleFotoChange}
              />
            </label>

            <InputGroup>
              <label>Nome</label>
              <input
                type="text"
                value={nomeUsuario}
                onChange={(e) => setNomeUsuario(e.target.value)}
                required
              />
            </InputGroup>

            <InputGroup>
              <label>Email</label>
              <input type="email" required />
            </InputGroup>

            <InputGroup>
              <label>Senha</label>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </InputGroup>

            <BotaoSalvar type="submit">Registrar</BotaoSalvar>
          </Form>
        </FloatingCard>
      </TopImageContainer>

      <PageBackground />
      <Rodape>Cloudy.IO</Rodape>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  position: relative;
  min-height: 100vh;
  background-color: #0a4a5c;
  overflow: hidden;
`;

const TopImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
`;

const TopImage = styled.img`
  width: 100%;
  height: 80%;
  object-fit: cover;
`;

const FloatingCard = styled.div`
  position: relative;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -40%);
  background-color: #152033;
  padding: 2.5rem;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  z-index: 2;
`;

const PageBackground = styled.div`
  background-color: #0a4a5c;
  height: calc(100vh - 250px);
`;

const Logo = styled.img`
  display: block;
  margin: 0 auto 1.5rem auto;
  height: 60px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputGroup = styled.div`
  margin-bottom: 1rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: white;
  }

  input {
    width: 100%;
    padding: 0.6rem;
    border-radius: 4px;
    border: none;
    background-color: white;
    color: black;
  }
`;

const BotaoSalvar = styled.button`
  background-color: #3486eb;
  color: white;
  font-weight: bold;
  padding: 0.8rem;
  border: none;
  border-radius: 4px;
  margin-top: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #296fcc;
  }
`;

const PreviewImage = styled.img`
  display: block;
  margin: 0 auto 1rem auto;
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid #ccc;
`;

const InputFile = styled.input`
  display: none;
`;

const Rodape = styled.footer`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  color: white;
  font-family: sans-serif;
  font-size: 1rem;
`;
