import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import styled from "styled-components";
import Logo_cloud from "../logo/Logo_cloud.png";
import lagoFurnas from "../logo/lago_furnas.jpg";
import capitolio from "../logo/capitolio.jpg";
import nuvens from "../logo/nuvens.jpg";
import LoadingCircleSpinner from "../components/perfil/LoadingScreen";
import ConfirmModal from "../components/pagina/ModalCadastro";

const images = [lagoFurnas, capitolio, nuvens];

const Cadastro: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    dataNascimento: "",
    c_password: "",
    city: "",
    role: "user"
  });
  
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalStatus, setModalStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  console.log(formData);
  const Verificar = (): boolean => {
    setLoading(false);
  
    if (!formData.city || formData.city.trim() === "") {
      window.alert("Por favor, selecione uma cidade.");
      return false;
    }
  
    if (formData.password !== formData.c_password) {
      window.alert(
        "As senhas não estão batendo, por favor, verifique se as senhas são correspondentes"
      );
      return false;
    }
  
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Verificar()) {
      setShowConfirmModal(true);
    }
  };

  const confirmCadastro = async () => {
    setModalStatus("loading");
    try {
      const response = await api.post("api/users/register", formData);
       setTimeout(() => {
      if (response.status === 201) {
        setModalStatus("success");
        setTimeout(() => {
          setShowConfirmModal(false);
          navigate("/login");
        }, 1500); // Tempo de exibição da mensagem de sucesso
      }
    }, 2000); // Delay antes da mensagem de sucesso

  } catch (error) {
    console.error("Erro ao cadastrar:", error);

    // Delay antes de mostrar a mensagem de erro
    setTimeout(() => {
      setModalStatus("error");
      setTimeout(() => {
        setModalStatus("idle");
      }, 2000); // Tempo de exibição da mensagem de erro
    }, 2000); // Delay antes da mensagem de erro
  }
};

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);


 return (
  <>
    {loading ? (
      <LoadingCircleSpinner />
    ) : (
      <MainContainer>
        <Container>
          <FormContainer>
            <LogoImage src={Logo_cloud} alt="Logo Alternativo" />
            <Logo>Cloud.<span>io</span></Logo>

            <Form onSubmit={handleSubmit}>
              <InputLabel htmlFor="nome">Nome</InputLabel>
              <InputField name="name" placeholder="Digite seu nome" onChange={handleChange} required />

              <InputLabel htmlFor="email">Email</InputLabel>
              <InputField name="email" type="email" placeholder="Digite seu email" onChange={handleChange} required />

              <InputLabel htmlFor="senha">Senha</InputLabel>
              <InputField name="password" type="password" placeholder="Digite sua senha" onChange={handleChange} required />

              <InputLabel htmlFor="confirmar senha">Confirme sua senha</InputLabel>
              <InputField name="c_password" type="password" placeholder="Digite sua senha novamente" onChange={handleChange} required />

              <InputLabel htmlFor="city">Cidade:</InputLabel>
              <SelectField name="city" onChange={handleChange} required>
                <option value={""}>Selecione sua cidade</option>
                <option value={"Aguanil"}>Aguanil</option>
                <option value={"Alfenas"}>Alfenas</option>
                <option value={"Alpinópolis"}>Alpinópolis</option>
                <option value={"Alterosa"}>Alterosa</option>
                <option value={"Areado"}>Areado</option>
                <option value={"Boa_Esperança"}>Boa Esperança</option>
                <option value={"Cabo_Verde"}>Cabo Verde</option>
                <option value={"Camacho"}>Camacho</option>
                <option value={"Campo_Belo"}>Campo Belo</option>
                <option value={"Campo_do_Meio"}>Campo do Meio</option>
                <option value={"Campos_Gerais"}>Campos Gerais</option>
                <option value={"Cana_Verde"}>Cana Verde</option>
                <option value={"Candeias"}>Candeias</option>
                <option value={"Capitólio"}>Capitólio</option>
                <option value={"Carmo_do_Rio_Claro"}>Carmo do Rio Claro</option>
                <option value={"Conceição_da_Aparecida"}>Conceição da Aparecida</option>
                <option value={"Coqueiral"}>Coqueiral</option>
                <option value={"Cristais"}>Cristais</option>
                <option value={"Divisa_Nova"}>Divisa Nova</option>
                <option value={"Elói_Mendes"}>Elói Mendes</option>
                <option value={"Fama"}>Fama</option>
                <option value={"Formiga"}>Formiga</option>
                <option value={"Guapé"}>Guapé</option>
                <option value={"Ilicínea"}>Ilicínea</option>
                <option value={"Itaú_de_Minas"}>Itaú de Minas</option>
                <option value={"Juruaia"}>Juruaia</option>
                <option value={"Lavras"}>Lavras</option>
                <option value={"Luminárias"}>Luminárias</option>
                <option value={"Machado"}>Machado</option>
                <option value={"Mato_Verde"}>Mato Verde</option>
                <option value={"Nova_Resende"}>Nova Resende</option>
                <option value={"Passos"}>Passos</option>
                <option value={"São_João_Batista_do_Glória"}>São João Batista do Glória</option>
                <option value={"São_José_da_Barra"}>São José da Barra</option>
              </SelectField>

              <Button type="submit">Cadastrar</Button>
              <BackLink to="/Login">← Voltar para o login</BackLink>
            </Form>
          </FormContainer>

          <ImageContainer>
            {images.map((imgSrc, index) => (
              <CarouselImage
                key={index}
                src={imgSrc}
                alt={`imagem-login-${index}`}
                isVisible={index === currentImageIndex}
              />
            ))}
          </ImageContainer>
        </Container>
      </MainContainer>
    )}

    {/* Modal de confirmação */}
    {showConfirmModal && (
    <ConfirmModal
      onConfirm={confirmCadastro}
      onCancel={() => {
        setShowConfirmModal(false);
        setModalStatus("idle");
      }}
      status={modalStatus}
    />
    )}
  </>
);
};
  
export default Cadastro;

// Styled Components

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  height: auto;
  width: 100%;
`;

const BackLink = styled(Link)`
  margin-top: 10px;
  text-align: center;
  font-size: 0.9rem;
  color: #0073e6;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const FormContainer = styled.div`
  flex: 1;
  max-width: 33.33%;
  background-color: #ffffff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

const Logo = styled.h1`
  margin-top: -8px;
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
  margin-top: -100px;
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

const SelectField = styled.select`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  width: 95%;
`;

const Button = styled.button`
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
  font-weight:bold;
  text-transform:uppercase;
  cursor: pointer;
  text-decoration: none;
  background: linear-gradient(90deg, var(--myColor1), var(--myColor2));
  transition: --myColor1 500ms, --myColor2 500ms;

  &:hover {
    --myColor1: #57C785;
    --myColor2: #EDDD53;
  }
`;
