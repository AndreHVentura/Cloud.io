import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

interface ConfirmModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  status: "idle" | "loading" | "success" | "error";
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ onConfirm, onCancel, status }) => {
  return (
    <Overlay>
      <ModalContainer
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        {status === "loading" ? (
          <Spinner />
        ) : status === "success" ? (
          <Message>Alderações concluídas com sucesso!</Message>
        ) : status === "error" ? (
          <Message>Erro ao Alterar dados!</Message>
        ) : (
          <>
            <Header>Confirmar Alteração</Header>
            <Content>
              <span>Deseja confirmar Alterações?</span>
            </Content>
            <Divider />
            <ButtonRow>
              <CancelButton onClick={onCancel}>Cancelar</CancelButton>
              <ConfirmButton onClick={onConfirm}>Confirmar</ConfirmButton>
            </ButtonRow>
          </>
        )}
      </ModalContainer>
    </Overlay>
  );
};

export default ConfirmModal;

// Styled components
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = motion(styled.div`
  background-color: #2f2f2f;
  color: #fff;
  padding: 2rem;
  border-radius: 12px;
  max-width: 90%;
  width: 400px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
`);

const Header = styled.h2`
  margin: 0;
  text-align: left;
  font-size: 1.25rem;
`;

const Content = styled.div`
  margin: 1rem 0;
  text-align: left;
  font-size: 1rem;
`;

const Divider = styled.div`
  border-top: 1px solid #444;
  margin-top: auto;
  margin-bottom: 1rem;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const ConfirmButton = styled.button`
  background-color: #00cc66;
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #18e09a;
  }
`;

const CancelButton = styled.button`
  background-color: #666;
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #888;
  }
`;

const Spinner = styled.div`
  border: 4px solid #999;
  border-top: 4px solid #00cc66;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: auto;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Message = styled.div`
  font-size: 1rem;
  padding: 1.5rem 0;
  text-align: center;
  color: white;
`;