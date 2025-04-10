import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout><Login /></MainLayout>} />
        <Route path="/cadastro" element={<MainLayout><Cadastro /></MainLayout>} />
        <Route path="/home" element={<MainLayout><Home /></MainLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
