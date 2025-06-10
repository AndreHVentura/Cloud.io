
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./styles/themes";
import { ThemeProviderCustom, useThemeCustom } from "./contexts/ThemeContext";
import GlobalStyle from "./styles/globalStyle";
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
<<<<<<< HEAD
=======
import RedefinirSenha from "./pages/Redefinir_Senha"; 
>>>>>>> 9ccfb56201fa3200382ca6646463859913cf791e

function App() {
  return (
    <ThemeProviderCustom>
      <InnerApp />
    </ThemeProviderCustom>
  );
}

function InnerApp() {
  const { isLightTheme } = useThemeCustom();

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
