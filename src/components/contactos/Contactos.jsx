import "./Contactos.css";

import { useState, useEffect } from "react";
import MenuMobile from "../menuMobile/MenuMobile";
import Menu from "../Menu/Menu"

export default function Contactos() {
  const [isMobile, setIsMobile] = useState(false);
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="contactos-container">
      <div className="contactos-menu">
        {isMobile ? <MenuMobile /> : <Menu />}
      </div>
      <div className="contactos-informacion">
        <h1>Contactos</h1>
        <p>Contactarse con el administrador para cualquier inconveniente</p>
      </div>
    </div>
  );
}
