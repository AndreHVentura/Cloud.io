import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import GlobalStyle from "./styles/GlobalStyles";

function App() {
  return (
    <BrowserRouter>
          <GlobalStyle /> {/* Deve estar apenas aqui */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;