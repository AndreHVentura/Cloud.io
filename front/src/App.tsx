import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import Home from "./pages/Home";
import HomePage from "./pages/Pagina_Inicial";
import MainLayout from "./layouts/MainLayout";
import { AuthProvider } from "./context/AuthContext";
import GlobalStyle from "./styles/globalStyle";
import Alerta from "./pages/Alerta";
import Historico from "./pages/Historico";

function App() {
  return (
    <AuthProvider>
      <GlobalStyle /> {/* Aqui está a forma correta de usar */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
          <Route path="/login" element={<MainLayout><Login /></MainLayout>} />
          <Route path="/cadastro" element={<MainLayout><Cadastro /></MainLayout>} />
          <Route path="/home" element={<MainLayout><Home /></MainLayout>} />
          <Route path="/alerts" element={<MainLayout><Alerta /></MainLayout>} />
          <Route path="/history" element={<MainLayout><Historico /></MainLayout>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;