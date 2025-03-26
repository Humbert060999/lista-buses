import "./TablaPlanillas.css";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { Table, Button, Space } from "antd";
import Formulario from "../cliente/VentanaCliente";

export default function TablaPlanillas() {
  const navigate = useNavigate(); 
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [scrollY, setScrollY] = useState(450);
  const columns = [
    {
      title: "Fecha",
      dataIndex: "fecha",
      key: "fecha",
      width: 70,
    },
    {
      title: "Día",
      dataIndex: "dia",
      key: "dia",
      width: 95,
    },
    {
      title: "Estado",
      dataIndex: "estado",
      key: "estado",
      width: 90,
      render: (estado) => (
        <span style={{ color: estado === "Listo" ? "green" : "red" }}>
          {estado}
        </span>
      ),
    },
    {
      title: "Opciones",
      key: "opciones",
      width: 100,
      render: (text, record) => (
        <Space className="tabla-buttons">
          <Button type="primary" onClick={() => editarRegistro(record.key)}>
            Editar
          </Button>
          <Button danger onClick={() => eliminarRegistro(record.key)}>
            Eliminar
          </Button>
        </Space>
      ),
    },
  ];

  // Datos de ejemplo para la tabla
  const data = [
    {
      key: "1",
      fecha: "10/01/2024",
      dia: "Lunes",
      estado: "Listo",
    },
    {
      key: "2",
      fecha: "30/12/2024",
      dia: "Miercoles",
      estado: "En curso",
    },
    {
      key: "3",
      fecha: "10/01/2024",
      dia: "Lunes",
      estado: "Listo",
    },
    {
      key: "4",
      fecha: "30/12/2024",
      dia: "Miercoles",
      estado: "En curso",
    },
    {
      key: "5",
      fecha: "10/01/2024",
      dia: "Lunes",
      estado: "Listo",
    },
    {
      key: "6",
      fecha: "30/12/2024",
      dia: "Miercoles",
      estado: "En curso",
    },
    {
      key: "7",
      fecha: "10/01/2024",
      dia: "Lunes",
      estado: "Listo",
    },
    {
      key: "8",
      fecha: "30/12/2024",
      dia: "Miercoles",
      estado: "En curso",
    },
    {
      key: "9",
      fecha: "10/01/2024",
      dia: "Lunes",
      estado: "Listo",
    },
    {
      key: "10",
      fecha: "30/12/2024",
      dia: "Miercoles",
      estado: "En curso",
    },
  ];

  useEffect(() => {
    // Función para actualizar el scroll según el tamaño de la pantalla
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 768) {
        // Tamaño de pantalla pequeño, como móvil
        setScrollY(610);
      }
    };

    // Escuchar cambios en el tamaño de la pantalla
    window.addEventListener("resize", handleResize);

    // Llamar la función una vez al cargar para establecer el valor inicial
    handleResize();

    // Limpiar el evento al desmontar el componente
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Función para editar
  const editarRegistro = (key) => {
    console.log("Editar registro con key:", key);
  };

  // Función para eliminar
  const eliminarRegistro = (key) => {
    console.log("Eliminar registro con key:", key);
  };

  const cambiarVentana = (e) => {
    navigate("/formulario");
  };

  return (
    <div>
      {mostrarTabla && (
        <div>
          <div className="tabla-button-nuevo">
            <Button type="primary" onClick={cambiarVentana}>
              Nuevo
            </Button>
          </div>
          <div className="tabla-container">
            <Table
              columns={columns}
              dataSource={data}
              tableLayout="fixed"
              scroll={{ y: scrollY }} // Aplicar el valor dinámico del scroll
              pagination={false}
            />
          </div>
        </div>
      )}
      {mostrarFormulario && (
        <div>
          <Formulario />
        </div>
      )}
    </div>
  );
}
