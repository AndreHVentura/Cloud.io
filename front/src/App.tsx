import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lightTheme, darkTheme } from "./styles/themes";
import GlobalStyle from "./styles/globalStyle";
import { AuthProvider } from "./contexts/AuthContext";
import MainLayout from "./layouts/MainLayout";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import Home from "./pages/Home";
import HomePage from "./pages/Pagina_Inicial";
import Alerta from "./pages/Alerta";
import Historico from "./pages/Historico";
import AlertsP from "./components/pagina/AlertsP";
import ProtectedRoute from "./components/ProtectedRoute";
import Graphics from "./components/pagina/graphics";
import Climate from "./pages/Climate";
import Configuracoes from "./pages/Configuracoes";
import RedefinirSenha from "./pages/Redefinir_Senha"; 

function App() {
  const [isLightTheme, setIsLightTheme] = useState(true);

  // Expor o setter globalmente (não é o ideal, mas prático neste caso)
  useEffect(() => {
    (window as any).toggleTheme = () => setIsLightTheme(prev => !prev);
  }, []);

  return (
    <ThemeProvider theme={isLightTheme ? lightTheme : darkTheme}>
      <AuthProvider>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
            <Route path="/login" element={<MainLayout><Login /></MainLayout>} />
            {/* Corrigido para usar a página RedefinirSenha */}
            <Route path="/redefinir_senha" element={<MainLayout><RedefinirSenha /></MainLayout>} />
            <Route path="/register" element={<MainLayout><Cadastro /></MainLayout>} />
            {/* Rota para o gráfico */}
            <Route path="/graphic" element={<MainLayout><Graphics /></MainLayout>} />
            <Route path="/alert" element={<MainLayout><AlertsP /></MainLayout>} />
            <Route path="/homepage" element={<MainLayout><HomePage /></MainLayout>} />
            <Route path="/climate" element={<MainLayout><Climate /></MainLayout>} />
            <Route path="/home" element={<MainLayout><Home /></MainLayout>} />
            <Route path="/history" element={<MainLayout><Historico /></MainLayout>} />
            <Route path="/alerts" element={<MainLayout><Alerta /></MainLayout>} />
            
            {/* Rotas protegidas */}
            <Route element={<ProtectedRoute />}>
              <Route path="/settings" element={<MainLayout><Configuracoes /></MainLayout>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
