import "./Home.css";
import { useState, useEffect } from "react";
import Menu from "../../components/menu/Menu";
import MenuMobile from "../../components/menuMobile/MenuMobile";
import TablaPlanillas from "../../components/tabla/TablaPlanillas";

export default function Home() {
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
    <div className="home-container">
      <div className="home-menu">{isMobile ? <MenuMobile /> : <Menu />}</div>
      <div className="home-table">
        <TablaPlanillas />
      </div>
    </div>
  );
}
