import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import { AuthProvider } from "./context/AuthContext";
import GlobalStyle from "./styles/globalStyle";

function App() {
  return (
    <AuthProvider>
      <GlobalStyle /> {/* Aqui está a forma correta de usar */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout><Login /></MainLayout>} />
          <Route path="/cadastro" element={<MainLayout><Cadastro /></MainLayout>} />
          <Route path="/home" element={<MainLayout><Home /></MainLayout>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;