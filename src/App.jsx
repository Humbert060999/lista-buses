import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login"
import Home from "./pages/home/Home"
import Contactos from "./components/contactos/Contactos"
import Cliente from "./pages/cliente/Cliente"

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/inicio" element={<Home />} />
        <Route path="/contactos" element={<Contactos />} />
        <Route path="/formulario" element={<Cliente />} />
      </Routes>
    </Router>
  );
}

export default App;
