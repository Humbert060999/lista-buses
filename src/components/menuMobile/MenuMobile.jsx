import "./MenuMobile.css";
import React, { useState } from "react";
import { Drawer, Menu, Modal } from "antd";
import {
  MenuOutlined,
  CloseOutlined,
  LogoutOutlined,
  ContactsOutlined,
  ExclamationCircleFilled,
  HomeOutlined,
  DownOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
import IconoUsuario from "../../assets/icono.png";
import Logo from "../../assets/logo-titulo.png";

export default function MenuMobile() {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const [estadoOptionMenu, setEstadoOptionMenu] = useState("1");

  const showDrawer = () => {
    setVisible(true);
  };

  const closeDrawer = () => {
    setVisible(false);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  // Funciones para controlar el modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    navigate("/");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Definición de elementos del menú
  const menuItems = [
    {
      key: "1",
      label: (
        <NavLink
          to="/inicio"
          onClick={closeDrawer}
          style={{ color: "#fff" }} // Aplica el estilo aquí
        >
          <b>Inicio</b>
        </NavLink>
      ),
      icon: (
        <HomeOutlined
          style={{ fontSize: "20px", marginRight: "15px", color: "#fff" }}
        />
      ), // Asegúrate de estilizar el ícono también
      children: [
        {
          key: "4",
          style: { color: "#fff" },
          label: (
            <NavLink
              to="/formulario"
              onClick={closeDrawer}
              style={{ color: "#fff" }}
            >
              <b>Nueva plantilla</b>
            </NavLink>
          ),
          icon: <FileAddOutlined style={{ fontSize: "20px", color: "#fff" }} />,
        },
      ],
    },
    {
      key: "2",
      style: { color: "#fff" },
      label: (
        <NavLink to="/contactos" onClick={closeDrawer}>
          <b>Contactos</b>
        </NavLink>
      ),
      icon: (
        <ContactsOutlined style={{ fontSize: "20px", marginRight: "15px" }} />
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
      icon: (
        <LogoutOutlined style={{ fontSize: "20px", marginRight: "15px" }} />
      ),
    },
  ];

  const onClick = (e) => {
    setEstadoOptionMenu(e.key);
  };

  return (
    <div className="menu-container-mobile">
      <button
        className="button-menu-mobile"
        type="primary"
        onClick={showDrawer}
      >
        <MenuOutlined className="icon-menu-mobile" />
      </button>
      <img
        src={Logo}
        alt="Logo de la empresa"
        className="menu-mobile-logo-empresa"
      />
      <Drawer
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.071)", // Fondo blanco translúcido
          backdropFilter: "blur(20px)",
          color: "#fff",
        }}
        closeIcon={<CloseOutlined className="custom-close-icon" />}
        width={250}
        placement="left"
        onClose={closeDrawer}
        open={visible}
      >
        <div className="menu-icon-container">
          <img
            src={IconoUsuario}
            alt="Imagen de icono de usuario"
            className="menu-mobile-icon"
          />
        </div>
        <Menu
          mode="inline"
          className="menu-options-mobile"
          onClick={onClick}
          items={menuItems}
          selectedKeys={[estadoOptionMenu]}
          expandIcon={({ isOpen }) => (
            <DownOutlined
              style={{
                color: "#fff",
                transform: isOpen ? "rotate(180deg)" : "",
              }}
            />
          )}
        />
      </Drawer>

      {/* Modal de confirmación */}
      <Modal
        title={
          <>
            <ExclamationCircleFilled
              style={{ color: "yellow", marginRight: "10px", fontSize: "25px" }}
            />{" "}
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
