import { useEffect, useState } from "react";
import styled from "styled-components";
import { Icons, IonIcon } from "../perfil/Icons";

declare global {
  interface Window {
    VLibras: {
      Widget: new (url: string) => any;
    };
  }
}

export default function AccessibilityMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [vlibrasReady, setVlibrasReady] = useState(false);

  useEffect(() => {
    if ((window as any).VLibras) {
      setVlibrasReady(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://vlibras.gov.br/app/vlibras-plugin.js";
    script.async = true;
    script.onload = () => {
      if ((window as any).VLibras) {
        // Aguarde um pouco para garantir que o DOM está estável
        setTimeout(() => {
          try {
            new (window as any).VLibras.Widget("https://vlibras.gov.br/app");
            setVlibrasReady(true);
          } catch (e) {
            console.error("Erro ao iniciar VLibras:", e);
          }
        }, 500); // aguarde 500ms
      }
    };
    document.body.appendChild(script);
  }, []);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleFontSize = (direction: "increase" | "decrease") => {
    const html = document.querySelector("html");
    const currentSize = parseFloat(getComputedStyle(html!).fontSize);
    const newSize =
      direction === "increase" ? currentSize + 2 : currentSize - 2;
    html!.style.fontSize = `${newSize}px`;
  };

  const handleReadText = () => {
    const selection = window.getSelection()?.toString();
    if (selection) {
      const utterance = new SpeechSynthesisUtterance(selection);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleToggleVLibras = () => {
    const existingWrapper = document.querySelector(".vp-plugin-wrapper");

    // Se já existe, apenas mostrar/ocultar
    if (existingWrapper) {
      existingWrapper.classList.toggle("hidden");
      return;
    }

    // Se ainda não está pronto, carregue o script e crie
    const script = document.createElement("script");
    script.src = "https://vlibras.gov.br/app/vlibras-plugin.js";
    script.async = true;
    script.onload = () => {
      setTimeout(() => {
        try {
          new (window as any).VLibras.Widget("https://vlibras.gov.br/app");
          setVlibrasReady(true);
        } catch (e) {
          console.error("Erro ao iniciar VLibras:", e);
        }
      }, 500);
    };
    script.onerror = () => {
      console.error("Erro ao carregar o script do VLibras");
    };

    document.body.appendChild(script);
  };

  const toggleTheme = () => {
    (window as any).toggleTheme?.();
  };

  return (
    <Wrapper>
      <Button onClick={toggleDropdown}>
        <Icone icon={Icons.accessibilityOutline} />
      </Button>
      {isOpen && (
        <Dropdown>
          <Option onClick={toggleTheme}>
            <IonIcon icon={Icons.moonOutline} /> Tema
          </Option>
          <Option onClick={handleReadText}>
            <IonIcon icon={Icons.volumeHighOutline} /> Leitor
          </Option>
          <Option onClick={() => handleFontSize("increase")}>
            <IonIcon icon={Icons.textOutline} /> Aumentar fonte
          </Option>
          <Option onClick={() => handleFontSize("decrease")}>
            <IonIcon icon={Icons.textOutline} /> Diminuir fonte
          </Option>
          <Option onClick={handleToggleVLibras}>
            <IonIcon icon={Icons.handLeftOutline} /> Libras
          </Option>
        </Dropdown>
      )}
    </Wrapper>
  );
}

// Styled
const Wrapper = styled.div`
  position: relative;
`;

const Button = styled.button`
  background: transparent;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
`;

const Icone = styled(IonIcon)`
  &:hover {
    color: #57c785;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 2rem;
  left: 0;
  background: white;
  color: black;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  z-index: 1000;
`;

const Option = styled.button`
  background: none;
  border: none;
  color: inherit;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.3rem 0.5rem;
  width: 100%;
  text-align: left;
  cursor: pointer;

  &:hover {
    background: #eee;
  }
`;
