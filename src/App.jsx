import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Componentes/Login";
import VentanaCliente from "./Componentes/ventanaCliente";
import Home from "./Componentes/Home/Home";
import Contactos from "./Componentes/Contactos/Contactos";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/cliente" element={<VentanaCliente />} />
        <Route path="/inicio" element={<Home />} />
        <Route path="/contactos" element={<Contactos />} />
      </Routes>
    </Router>
  );
}

export default App;
