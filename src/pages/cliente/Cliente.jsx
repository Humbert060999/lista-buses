import "./Cliente.css"
import { useState, useEffect } from "react";
import Menu from "../../components/menu/Menu";
import MenuMobile from "../../components/menuMobile/MenuMobile"
import VentanaCliente from "../../components/cliente/VentanaCliente";

export default function cliente() {
  const [isMobile, setIsMobile] = useState(window.matchMedia("(max-width: 768px)").matches);
   useEffect(() => {
      const mediaQuery = window.matchMedia("(max-width: 768px)");
  
      const handleMediaChange = (e) => {
        setIsMobile(e.matches);
      };
  
      mediaQuery.addEventListener("change", handleMediaChange);
  
      return () => {
        mediaQuery.removeEventListener("change", handleMediaChange);
      };
    }, []);
  return (
    <div className="cliente-container">
      <div className="cliente-menu">
       {isMobile ? <MenuMobile /> : <Menu />}
      </div>
      <div>
        <VentanaCliente />
      </div>
    </div>
  );
}
