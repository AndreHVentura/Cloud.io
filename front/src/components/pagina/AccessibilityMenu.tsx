import { useState } from "react";
import styled from "styled-components";
import { Icons, IonIcon } from "../perfil/Icons";
import { useThemeCustom } from "../../contexts/ThemeContext";

export default function AccessibilityMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLightTheme, toggleTheme } = useThemeCustom();

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

  return (
    <Wrapper>
      <Button onClick={toggleDropdown}>
        <Icone icon={Icons.accessibilityOutline} />
      </Button>
      {isOpen && (
        <Dropdown>
          <Option onClick={toggleTheme}>
            <IonIcon icon={isLightTheme ? Icons.moonOutline : Icons.sunnyOutline} />
            
          </Option>
          <Option onClick={handleReadText}>
            <IonIcon icon={Icons.volumeHighOutline} /> Leitor
          </Option>
          <Option onClick={() => handleFontSize("increase")}>
            <IonIcon icon={Icons.textOutline} /> +
          </Option>
          <Option onClick={() => handleFontSize("decrease")}>
            <IonIcon icon={Icons.textOutline} /> -
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
