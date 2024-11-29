import "./Home.css";
import { useState, useEffect } from "react";
import Menu from "../Menu/Menu";
import MenuMobile from "../MenuMobile/MenuMobile";
import TablaPlanillas from "../TablaDocumentos.jsx/TablaPlanillas";

export default function Home() {
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
    <div className="home-container">
      <div className="home-menu">{isMobile ? <MenuMobile /> : <Menu />}</div>
      <div className="home-table">
        <TablaPlanillas />
        
      </div>
    </div>
  );
}
