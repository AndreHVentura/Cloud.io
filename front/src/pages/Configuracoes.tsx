import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../contexts/AuthContext";
import api from "../services/api";
import ConfirmModal from "../components/pagina/ModalAlteração";
import Logo_cloud from "../logo/Logo_cloud.png";
import lagoFurnas from "../logo/lago_furnas.jpg";
import capitolio from "../logo/capitolio.jpg";
import nuvens from "../logo/nuvens.jpg";

const images = [lagoFurnas, capitolio, nuvens];
export default function Configuracoes() {
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [c_senha, setC_senha] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalStatus, setModalStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const context = useContext(AuthContext);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  if (!context) {
    throw new Error("AuthContext não encontrado. Certifique-se de que o componente está dentro de <AuthProvider>.");
  }
  const { user } = context;

  useEffect(() => {
  const interval = setInterval(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, 4000);

  return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function fetchUserData() {
      if (!user) return;
      try {
        const response = await api.get('/api/protected/user');
        const data = response.data;
        setNomeUsuario(data.user?.nome || "");
        setEmail(data.user?.email || "");
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
      }
    }
    fetchUserData();
  }, [user]);

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
    <MainContainer>
      <Container>
        <ConfigContainer>
          <LogoImage src={Logo_cloud} alt="Logo" />
          <Logo>Cloud.<span>io</span></Logo>
          <h2>Configurações da Conta</h2>
          <Form onSubmit={(e) => e.preventDefault()}>
            {/* Nome */}
            <InputLabel>Nome</InputLabel>
            <InputField 
              type="text" 
              name="nome" 
              value={nomeUsuario} 
              onChange={handleInputChange} 
            />

            {/* Email */}
            <InputLabel>Email</InputLabel>
            <InputField 
              type="email" 
              name="email" 
              value={email} 
              disabled 
            />

            {/* Senha */}
            <InputLabel>Nova senha</InputLabel>
            <InputField 
              type="password" 
              name="senha" 
              value={senha} 
              onChange={handleInputChange} 
            />

            {/* Confirmar Senha */}
            <InputLabel>Confirmar nova senha</InputLabel>
            <InputField 
              type="password" 
              value={c_senha} 
              onChange={(e) => setC_senha(e.target.value)} 
            />

            <SaveButton type="button" onClick={() => setShowConfirmModal(true)}>
              Salvar
            </SaveButton>
          </Form>
        </ConfigContainer>

        <ImageContainer>
          {images.map((imgSrc, index) => (
            <CarouselImage 
              key={index} 
              src={imgSrc} 
              alt={`imagem-${index}`} 
              isVisible={index === currentImageIndex} 
            />
          ))}
        </ImageContainer>
      </Container>

      {showConfirmModal && (
        <ConfirmModal 
          onConfirm={confirmAlteracao} 
          onCancel={() => { setShowConfirmModal(false); setModalStatus("idle"); }} 
          status={modalStatus} 
        />
      )}
    </MainContainer>
  );
}

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

const ConfigContainer = styled.div`
  position: relative;
  width: 30%;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  margin-top: -90px;
`;

const Logo = styled.h1`
  margin-top: 10px;
  font-size: 2.5rem;
  font-family: 'Inter Tight', sans-serif;
  background: linear-gradient(to right, #0073e6, #00cc66);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
`;

const LogoImage = styled.img`
  width: 70%;
  margin-bottom: -110px;
  object-fit: contain;
`;

const Form = styled.form`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
`;

const InputLabel = styled.label`
  color: #232323;
  margin-bottom: 8px;
  font-size: 1rem;
  font-weight: bold;
`;

const InputField = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  width: 90%;
`;

const SaveButton = styled.button`
  @property --myColor1 {
    syntax: '<color>';
    initial-value: #2A7B9B;
    inherits: false;
  }
  
  @property --myColor2 {
    syntax: '<color>';
    initial-value: #57C785;
    inherits: false;
  }

  color: white;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  text-decoration: none;
  background: linear-gradient(90deg, var(--myColor1), var(--myColor2));
  transition: --myColor1 500ms, --myColor2 500ms;

  &:hover {
    --myColor1: #57C785;
    --myColor2: #EDDD53;
  }
`;

const ImageContainer = styled.div`
  flex: 2.5;
  position: relative;
  overflow: hidden;
`;

const CarouselImage = styled.img<{ isVisible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: opacity 1s ease-in-out;
  pointer-events: none;
`;


