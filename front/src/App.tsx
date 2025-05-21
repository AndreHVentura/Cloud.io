import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lightTheme, darkTheme } from "./styles/themes";
import GlobalStyle from "./styles/globalStyle";
import { AuthProvider } from "./context/AuthContext";
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


function App() {
  const [isLightTheme, setIsLightTheme] = useState(true);

  // Expor o setter globalmente (não é o ideal, mas prático neste caso)
  useEffect(() => {
    (window as any).toggleTheme = () => setIsLightTheme(prev => !prev);
  }, []);

  // VLibras
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://vlibras.gov.br/app/vlibras-plugin.js";
    script.async = true;
    script.onload = () => {
      setTimeout(() => {
        try {
          (window as any).VLibras = (window as any).VLibras || {};
          new (window as any).VLibras.Widget("https://vlibras.gov.br/app");
        } catch (e) {
          console.error("Erro ao iniciar VLibras:", e);
        }
      }, 1000);
    };
    script.onerror = (e) => {
      console.error("Erro ao carregar o VLibras:", e);
    };
    document.body.appendChild(script);
  }, []);

  return (
    <ThemeProvider theme={isLightTheme ? lightTheme : darkTheme}>
      <AuthProvider>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
            <Route path="/login" element={<MainLayout><Login /></MainLayout>} />
            <Route path="/cadastro" element={<MainLayout><Cadastro /></MainLayout>} />
            {/* <Route path="/home" element={<MainLayout><Home /></MainLayout>} />
            <Route path="/history" element={<MainLayout><Historico /></MainLayout>} /> */}
            <Route path="/graphic" element={<MainLayout><Graphics /></MainLayout>} />
            <Route path="/alert" element={<MainLayout><AlertsP /></MainLayout>} />
            {/* <Route path="/alerts" element={<MainLayout><Alerta /></MainLayout>} /> */}
            <Route path="/homepage" element={<MainLayout><HomePage /></MainLayout>} />
            <Route path="/climate" element={<MainLayout><Climate /></MainLayout>} />
            <Route path="/home" element={<MainLayout><Home /></MainLayout>} />
            <Route path="/history" element={<MainLayout><Historico /></MainLayout>} />
            <Route path="/alerts" element={<MainLayout><Alerta /></MainLayout>} />
            {/* Rotas protegidas agrupadas */}
            <Route element={<ProtectedRoute />}>
            {/* <Route path="/home" element={<MainLayout><Home /></MainLayout>} /> */}
            {/* <Route path="/history" element={<MainLayout><Historico /></MainLayout>} /> */}
            {/* <Route path="/alerts" element={<MainLayout><Alerta /></MainLayout>} /> */}
            <Route path="/configuracoes" element={<MainLayout><Configuracoes /></MainLayout>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
export default App;
