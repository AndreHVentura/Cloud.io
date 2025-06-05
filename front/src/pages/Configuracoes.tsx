import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import topoImage from "../logo/canyon-furnas.jpg";
import { Pencil } from "lucide-react";
import { AuthContext } from "../contexts/AuthContext";
import api from "../services/api";
import ConfirmModal from "../components/pagina/ModalAlteração";

export default function Configuracoes() {
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [fotoPerfil, setFotoPerfil] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [editandoNome, setEditandoNome] = useState(false);
  const [c_senha, setC_senha] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalStatus, setModalStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("AuthContext não encontrado. Certifique-se de que o componente está dentro de <AuthProvider>.");
  }

  const { user } = context;

  useEffect(() => {
    async function fetchUserData() {
      if (!user) return;

      try {
        const response = await api.get('/api/protected/user');
        const data = response.data;

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
  }, [user]);

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFotoPerfil(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "nome") {
      setNomeUsuario(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "senha") {
      setSenha(value);
    }
  };

  // Função para confirmar as alterações
  const confirmAlteracao = async () => {
    setModalStatus("loading");
    try {
      const formData = new FormData();
      formData.append("nome", nomeUsuario);
      formData.append("email", email);
      formData.append("senha", senha);
      if (fotoPerfil) {
        formData.append("foto", fotoPerfil);
      }

      const response = await api.put(`/api/protected/${user?.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setModalStatus("success");
        setTimeout(() => {
          setShowConfirmModal(false);
          alert("Alterações salvas com sucesso!");
        }, 1500); // Exibe a mensagem de sucesso por 1.5s
      }
    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
      setModalStatus("error");
      setTimeout(() => {
        setModalStatus("idle");
      }, 2000); // Exibe a mensagem de erro por 2s
    }
  };

  return (
    <PageContainer>
      <TopImageContainer>
        <TopImage src={topoImage} alt="Imagem de topo" />
        <Container>
          <Form onSubmit={(e) => e.preventDefault()}>
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
                  name="nome"
                  value={nomeUsuario}
                  onChange={handleInputChange}
                  disabled={false}
                  required
                />
                <IconeBotao type="button">
                {/* // onClick={() => setEditandoNome(!editandoNome)}> */}
                  <Pencil size={16} />
                </IconeBotao>
              </InputComIcone>
            </InputGroup>

            <InputGroup>
              <label>Email</label>
              <InputComIcone>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleInputChange}
                  disabled={true}
                  required
                />
              </InputComIcone>
            </InputGroup>

            <InputGroup>
              <label>Senha</label>
              <InputComIcone>
              <input
                type="password"
                name="senha"
                value={senha}
                onChange={handleInputChange}
                required
              />
              <IconeBotao type="button">
                {/* // onClick={() => setEditandoNome(!editandoNome)}> */}
                  <Pencil size={16} />
              </IconeBotao>
              </InputComIcone>
            </InputGroup>

            <InputGroup>
              <label>Confirmar senha</label>
              <InputComIcone>
              <input
                type="password"
                value={c_senha}
                onChange={(e) => setC_senha(e.target.value)}
              />
              <IconeBotao type="button">
                {/* // onClick={() => setEditandoNome(!editandoNome)}> */}
                  <Pencil size={16} />
              </IconeBotao>
              </InputComIcone>
            </InputGroup>

            {/* Botão que chama a confirmação das alterações */}
            <BotaoSalvar type="button" onClick={() => setShowConfirmModal(true)}>
              Salvar alterações
            </BotaoSalvar>
          </Form>
        </Container>
      </TopImageContainer>

      <PageBackground />
      <Rodape>Cloudy.IO</Rodape>

      {/* Modal de confirmação */}
      {showConfirmModal && (
        <ConfirmModal
          onConfirm={confirmAlteracao}
          onCancel={() => {
            setShowConfirmModal(false);
            setModalStatus("idle");
          }}
          status={modalStatus}
        />
      )}
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
  opacity: 0.8;
  filter: brightness(70%);
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
