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
import AlertsP from "./components/pagina/AlertsP";
import ProtectedRoute from "./components/ProtectedRoute";
import Graphics from "./components/pagina/graphics";
import Climate from "./pages/Climate";

function App() {
  return (
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
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
export default App;
