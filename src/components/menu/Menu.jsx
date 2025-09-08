import "./Menu.css";

import React, { useState } from "react";
import { Menu, Modal } from "antd";
import {
  LogoutOutlined,
  ContactsOutlined,
  ExclamationCircleFilled,
  HomeOutlined,
} from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo-titulo.png";

export default function MenuM() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  const [estadoOptionMenu, setEstadoOptionMenu] = useState("4");

  // Funciones para controlar el modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    // Lógica para cerrar sesión (puedes añadir tu lógica aquí)
    navigate("/");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Definición de elementos del menú
  const menuItems = [
    {
      key: "1",
      icon: <HomeOutlined style={{ fontSize: "20px", marginRight: "5px" }} />,
      style: { color: "#fff" },
      label: (
        <NavLink to="/inicio">
          <b>Inicio</b>
        </NavLink>
      ),
    },
    {
      key: "2",
      style: { color: "#fff" },
      label: (
        <NavLink to="/contactos">
          <b>Contactos</b>
        </NavLink>
      ),
      icon: (
        <ContactsOutlined style={{ fontSize: "20px", marginRight: "5px" }} />
      ),
    },
    {
      key: "3",
      style: { color: "#fff" },
      label: (
        <NavLink onClick={showModal}>
          <b>Cerrar Sesión</b>
        </NavLink>
      ),
      icon: <LogoutOutlined style={{ fontSize: "20px", marginRight: "5px" }} />,
    },
  ];

  const onClick = (e) => {
    setEstadoOptionMenu(e.key);
  };

  return (
    <div className="menu-container">
      <div className="menu-title-options">
        <img
          src={Logo}
          alt="Logo de la empresa"
          className="menu-logo-empresa"
        />
        <Menu
          mode="horizontal"
          className="menu-options"
          items={menuItems}
          onClick={onClick}
          selectedKeys={[estadoOptionMenu]}
        />
      </div>

      {/* Modal de confirmación */}
      <Modal
        title={
          <>
            <ExclamationCircleFilled
              style={{ color: "yellow", marginRight: "10px", fontSize: "25px" }}
            />
            Mensaje de confirmación
          </>
        }
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Sí"
        cancelText="No"
      >
        <p>¿Está seguro de cerrar la sesión?</p>
      </Modal>
    </div>
  );
}
