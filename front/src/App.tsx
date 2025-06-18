import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./styles/themes";
import { ThemeProviderCustom, useThemeCustom } from "./contexts/ThemeContext";
import GlobalStyle from "./styles/globalStyle";
import MainLayout from "./layouts/MainLayout";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import Clima from "./pages/Clima";
import Grafico from "./pages/Graficos";
import HomePage from "./pages/Pagina_Inicial";
import Alerta from "./pages/Alerta";
import Historico from "./pages/Historico";
import AlertsP from "./components/pagina/AlertsP";
import ProtectedRoute from "./components/ProtectedRoute";
import Graphics from "./components/pagina/graphics";
import Climate from "./pages/Climate";
import Configuracoes from "./pages/Configuracoes";
import RedefinirSenha from "./pages/Redefinir_Senha"; 
import AlertProvider from "./contexts/AlertContext";

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
      <AlertProvider>
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
            <Route path="/clima" element={<MainLayout><Clima /></MainLayout>} />
            <Route path="/grafico" element={<MainLayout><Grafico /></MainLayout>} />
            <Route path="/history" element={<MainLayout><Historico /></MainLayout>} />
            <Route path="/alerts" element={<MainLayout><Alerta /></MainLayout>} />
            
            {/* Rotas protegidas */}
            <Route element={<ProtectedRoute />}>
              <Route path="/settings" element={<MainLayout><Configuracoes /></MainLayout>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
      </AlertProvider>
    </ThemeProvider>
  );
}

export default App;
