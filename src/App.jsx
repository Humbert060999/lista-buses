import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Componentes/Login";
import VentanaCliente from "./Componentes/VentanaCliente";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/cliente" element={<VentanaCliente />} />
      </Routes>
    </Router>
  );
}

export default App;
