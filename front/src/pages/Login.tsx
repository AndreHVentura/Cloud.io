import React from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Página de Login</h1>
      <button onClick={() => navigate("/cadastro")}>
        Não tem Cadastro? Crie sua conta!
      </button>
    </div>
  );
};

export default Login;