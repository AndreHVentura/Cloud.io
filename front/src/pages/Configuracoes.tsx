import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import topoImage from "../logo/canyon-furnas.jpg";
import { Pencil } from "lucide-react"; // ou use um emoji: ✏️
import { AuthContext } from "../contexts/AuthContext"; // exemplo do caminho

export default function Configuracoes() {
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [fotoPerfil, setFotoPerfil] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [editandoNome, setEditandoNome] = useState(false);
  const [editandoEmail, setEditandoEmail] = useState(false);
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("AuthContext não encontrado. Certifique-se de que o componente está dentro de <AuthProvider>.");
  }

  const { user } = context;

  useEffect(() => {
    const token = localStorage.getItem("token"); // ✅ Agora aqui dentro

    if (!token) return;

    async function fetchUserData() {
      try {
        const response = await fetch("http://localhost:5000/api/protected/user", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // <- isso é essencial!
          },
        });

        if (!response.ok) throw new Error("Erro ao buscar dados do usuário");

        const data = await response.json();

        setNomeUsuario(data.user?.nome || "");
        setEmail(data.user?.email || "");
        if (data.user?.photoUrl) {
          setPreview(data.user.photoUrl);
        }
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
      }
    }

    fetchUserData();
  }, []);

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFotoPerfil(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userId = 1; // substitua pelo ID real do usuário logado
    const formData = new FormData();
    formData.append("nome", nomeUsuario);
    formData.append("email", email);
    formData.append("senha", senha);
    if (fotoPerfil) {
      formData.append("foto", fotoPerfil);
    }

    try {
      const response = await fetch(`http://localhost:5000/users/${userId}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar usuário");
      }

      alert("Alterações salvas com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
      alert("Ocorreu um erro ao salvar. Tente novamente.");
    }
  };

  return (
    <PageContainer>
      <TopImageContainer>
        <TopImage src={topoImage} alt="Imagem de topo" />
        <Container>
          <Form onSubmit={handleSubmit}>
            <h2>Configurações da Conta</h2>

            <FotoPerfil>
              <LabelFoto htmlFor="foto">
                <PreviewImage
                  src={preview || "https://via.placeholder.com/100x100.png?text=Perfil"}
                  alt="Foto de Perfil"
                />
                <OverlayTexto>Alterar</OverlayTexto>
              </LabelFoto>
              <input
                type="file"
                id="foto"
                accept="image/*"
                onChange={handleFotoChange}
              />
            </FotoPerfil>

            <InputGroup>
              <label>Nome</label>
              <InputComIcone>
                <input
                  type="text"
                  value={nomeUsuario}
                  onChange={(e) => setNomeUsuario(e.target.value)}
                  disabled={!editandoNome}
                  required
                />
                <IconeBotao type="button" onClick={() => setEditandoNome(!editandoNome)}>
                  <Pencil size={16} />
                </IconeBotao>
              </InputComIcone>
            </InputGroup>

            <InputGroup>
              <label>Email</label>
              <InputComIcone>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!editandoEmail}
                  required
                />
                <IconeBotao type="button" onClick={() => setEditandoEmail(!editandoEmail)}>
                  <Pencil size={16} />
                </IconeBotao>
              </InputComIcone>
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
        </Container>
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
  opacity: 0.8; /* Transparência */
  filter: brightness(70%); /* Escurece a imagem */
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Container = styled.div`
  position: absolute;
  top: 70px;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  color: black;
  z-index: 2;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

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
`;

const LabelFoto = styled.label`
  position: relative;
  display: inline-block;
  cursor: pointer;
`;

const PreviewImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #444;
`;

const OverlayTexto = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  font-size: 0.75rem;
  text-align: center;
  border-bottom-left-radius: 50%;
  border-bottom-right-radius: 50%;
`;

const InputGroup = styled.div`
  margin-bottom: 1rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #000000;
  }

  input {
    width: 100%;
    padding: 0.6rem;
    border-color: black;
    border-radius: 4px;
    background-color: white;
    color: #000000;
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

const PageBackground = styled.div`
  background: linear-gradient(135deg, #0e0e1a, #1f1f2e);
  height: calc(100vh - 250px);
`;

const Rodape = styled.footer`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  color: white;
  font-family: sans-serif;
  font-size: 1rem;
`;

const InputComIcone = styled.div`
  display: flex;
  align-items: center;

  input {
    flex: 1;
    padding-right: 8px;
  }
`;

const IconeBotao = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 8px;
  color: #555;

  &:hover {
    color: #000;
  }
`;