import "./TablaPlanillas.css";

import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Input,
  Form,
  Button,
  Modal,
  Radio,
  message,
  Table,
  Space,
} from "antd";
import InputMask from "react-input-mask";
import Formulario from "../cliente/VentanaCliente";
import { pdf } from "@react-pdf/renderer";
import ConvertirPDF from "../convertPDF/ConvertirPDF";
import axios from "axios";
import { API_URL } from "../../api";

export default function TablaPlanillas() {


  const navigate = useNavigate();
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [scrollY, setScrollY] = useState(450);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalFormPasajero, setModalFormPasajero] = useState(false);
  const [formPasajeros] = Form.useForm();
  const [listPasajeros, setListPasajeros] = useState([]);
  const [contadorKey, setContadorKey] = useState(1);
  const [value, setValue] = useState(1);
  // Guardar el id del viaje al que se añade pasajero
  const [viajeSeleccionado, setViajeSeleccionado] = useState(null);
  const [asientosSeleccionados, setAsientosSeleccionados] = useState([]);
  const [asientos, setAsientos] = useState([]);


  // base de datos de prueba
  const [viajes, setViajes] = useState([]);
  const [pasajeros, setPasajeros] = useState([]);


  const columns = [
    {
      title: "Placa",
      dataIndex: "placa",
      key: "placa",
      width: 50,
    },
    {
      title: "Hora Salida",
      dataIndex: "horaViaje",
      key: "horaViaje",
      width: 50,
    },
    {
      title: "Conductor",
      key: "conductor1",
      width: 95,
      render: (text, record) => (
        `${record.nombresConductor1 || ""} ${record.apellidosConductor1 || ""}`
      ),
    },
    {
      title: "Destino",
      dataIndex: "destino",
      key: "destino",
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
          <Button onClick={() => editarRegistro(record.id)}>
            Editar
          </Button>
          <Button type="primary" onClick={() => descargarDocumento(record.id)}>
            Descargar
          </Button>
          <Button onClick={() => aniadirPasajero(record.id)}>
            Añadir pasajero
          </Button>
        </Space>
      ),
    },
  ];

  // Función para cargar los viajes
  const cargarViajes = async () => {
    try {
      const res = await axios.get(`${API_URL}/viajes`);
      setViajes(res.data);
    } catch (err) {
      console.error("Error al cargar los viajes:", err);
      message.error("No se pudo cargar los viajes");
    }
  };
  useEffect(() => {
    formPasajeros.setFieldsValue({ sexo: 1 });
    // Consumir la API de json-server
    cargarViajes();

    //adaptar el tamanio de la ventana 
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 768) {
        setScrollY(610);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const editarRegistro = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/viajes/${id}`);
      const data = response.data;

      console.log("Datos recuperados:", data);

      // Navegar al formulario en modo edición
      navigate("/formulario", { state: { viaje: data } });
    } catch (error) {
      console.error("Error al recuperar el viaje:", error);
      message.error("No se pudo recuperar el viaje");
    }
  };



  // Función para descargar el documento PDF
  const descargarDocumento = async (id) => {
    try {
      // 1. Buscar el viaje
      const datosViaje = viajes.find((v) => v.id === id);

      // 2. Traer pasajeros desde json-server
      const res = await fetch(`http://localhost:3001/pasajeros?idViaje=${id}`);
      const pasajerosViaje = await res.json();

      if (pasajerosViaje.length === 0) {
        message.warning("No hay pasajeros para este viaje");
        return;
      }

      // 3. Crear PDF
      const pdfInstance = pdf(
        <ConvertirPDF data={datosViaje} dataPasajeros={pasajerosViaje} />
      );

      // 4. Generar blob y descargar
      const blob = await pdfInstance.toBlob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `viaje-${id}.pdf`;
      link.click();
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error generando PDF:", error);
      message.error("No se pudo generar el PDF");
    }
  };


  // Función para añadir pasajeros
  const aniadirPasajero = async (id) => {
    console.log("Añadir pasajero al viaje ", id);
    setViajeSeleccionado(id); // guardamos a qué viaje pertenece

    // 1. Llamar a la BD para obtener pasajeros del viaje
    const res = await fetch(`http://localhost:3001/pasajeros?idViaje=${id}`);
    const pasajerosViaje = await res.json();

    // 2. Construir lista de asientos "limpia" y marcar vendidos
    const nuevosAsientos = Array.from({ length: 60 }, (_, i) => {
      const nroAsiento = i + 1;
      const ocupado = pasajerosViaje.find((p) => p.nroAsiento === nroAsiento);
      return {
        nroAsiento,
        estado: ocupado ? "vendido" : "disponible",
      };
    });

    setAsientos(nuevosAsientos);
    console.log("Los pasajeros del viaje ", id, " son ", pasajerosViaje);

    // 3. Guardar la lista de pasajeros en estado (para mostrar en la UI si hace falta)
    setListPasajeros(pasajerosViaje);

    // 4. Abrir modal de asientos
    setModalVisible(true);
  };


  const cambiarVentana = () => {
    navigate("/formulario");
  };


  const handleSeleccionar = (nroAsiento) => {
    setAsientos((prev) =>
      prev.map((a) => {
        if (a.nroAsiento === nroAsiento && a.estado === "disponible") {
          return { ...a, estado: "seleccionado" };
        } else if (a.nroAsiento === nroAsiento && a.estado === "seleccionado") {
          return { ...a, estado: "disponible" }; // deselecciona
        }
        return a; // si es "vendido" no se toca
      })
    );
  };



  const asientosEscritorio = useMemo(() => {
    const filas = 4;
    const columnas = Math.ceil(asientos.length / filas);
    const resultado = [];
    for (let c = 0; c < columnas; c++) {
      for (let f = filas - 1; f >= 0; f--) {
        const index = f + c * filas;
        if (index < asientos.length) resultado.push(asientos[index]);
      }
    }
    return resultado;
  }, [asientos]);


  // Confirmar asientos seleccionados
  const handleConfirmarAsientos = () => {
    // 1. Filtrar los seleccionados
    const seleccionados = asientos.filter(a => a.estado === "seleccionado");

    // 2. Extraer los números correctos
    const numerosAsientos = seleccionados.map(a => a.nroAsiento);

    console.log("Asientos seleccionados:", numerosAsientos);

    // 3. Guardamos en estado los asientos seleccionados
    setAsientosSeleccionados(numerosAsientos);

    console.log("Pasajeros actuales del viaje:", listPasajeros);


    // 5. Cerrar modal de asientos y abrir modal de formulario pasajero
    setModalFormPasajero(true);
    setModalVisible(false);
  };



  const guardarDatosPasajeros = async (data) => {
    try {
      // Construir objeto con las propiedades en el orden deseado
      const pasajero = {
        ci: data.ci,
        nombre: data.nombre,
        apellido: data.apellido,
        fechaNacimiento: data.fechaNacimiento,
        nacionalidadPasajero: data.nacionalidadPasajero,
        destinoPasajero: data.destinoPasajero,
        sexo: data.sexo,
        nroAsiento: asientosSeleccionados[currentFormIndex],
        idViaje: viajeSeleccionado,
        id: crypto.randomUUID(), // ID único
      };

      // Enviar al json-server
      await fetch("http://localhost:3001/pasajeros", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pasajero),
      });

      message.success(`Pasajero del asiento ${pasajero.nroAsiento} añadido correctamente`);

      formPasajeros.resetFields();
      formPasajeros.setFieldsValue({ sexo: 1 });

      // Avanzar al siguiente formulario o cerrar modal
      if (currentFormIndex < asientosSeleccionados.length - 1) {
        setCurrentFormIndex(currentFormIndex + 1);
      } else {
        setModalFormPasajero(false);
        setCurrentFormIndex(0);
      }
    } catch (error) {
      console.error("Error guardando pasajero:", error);
      message.error("No se pudo guardar el pasajero. Intenta de nuevo.");
    }
  };



  const closeModalPasajero = () => {
    setModalFormPasajero(false);
  }

  const onChangeSexo = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const [currentFormIndex, setCurrentFormIndex] = useState(0);


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
              dataSource={viajes}
              tableLayout="fixed"
              scroll={{ y: scrollY }}
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
      {/* //Un modal para poder seleccionar los asientos que quiere el cliente */}
      <Modal
        title="Seleccionar Asiento"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        width={window.innerWidth > 768 ? 1000 : '95%'}
        footer={[
          <Button key="cancel" onClick={() => setModalVisible(false)}>Cancelar</Button>,
          <Button key="ok" type="primary" onClick={handleConfirmarAsientos}>Confirmar</Button>,
        ]}
      >
        <div className="bus-container">
          {(window.innerWidth > 768 ? asientosEscritorio : asientos).map((asiento) => (
            <div
              key={asiento.nroAsiento}
              className={`asiento ${asiento.estado}`}
              onClick={() => asiento.estado !== "vendido" && handleSeleccionar(asiento.nroAsiento)}
            >
              {asiento.nroAsiento}
            </div>
          ))}
        </div>

      </Modal>

      {/* //Formulario de pasajeros */}
      <Modal
        title={`Formulario de pasajero - Asiento ${asientosSeleccionados[currentFormIndex]}`}
        open={modalFormPasajero}
        onOk={() => formPasajeros.submit()}
        onCancel={closeModalPasajero}
        okText="Guardar"
        cancelText="Cerrar"
        width="90%"
        className="form-pasajeros-container"
      >
        <Form
          form={formPasajeros}
          layout="vertical"
          onFinish={(values) =>
            guardarDatosPasajeros({
              ...values,
              nroAsiento: asientosSeleccionados[currentFormIndex],
            })
          }
        >
          <Form.Item
            label="CI"
            name="ci"
            rules={[
              { required: true, message: "Por favor, ingresa el CI" },
              { pattern: /^[0-9]{1,9}$/, message: "Solo números, máximo 9 dígitos" },
            ]}
          >
            <Input
              placeholder="Ingrese el número de carnet"
              maxLength={9}
              inputMode="numeric"
              pattern="[0-9]*"
            />
          </Form.Item>

          <Form.Item
            label="Nombre"
            name="nombre"
            rules={[
              { required: true, message: "Por favor, ingresa los nombres" },
              { pattern: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, message: "Solo se permiten letras" },
            ]}
          >
            <Input placeholder="Ingrese nombre(s)" maxLength={22} />
          </Form.Item>

          <Form.Item
            label="Apellido"
            name="apellido"
            rules={[
              { required: true, message: "Por favor, ingresa los apellidos" },
              { pattern: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, message: "Solo se permiten letras" },
            ]}
          >
            <Input placeholder="Ingrese los apellidos" maxLength={22} />
          </Form.Item>

          <Form.Item
            label="Fecha de nacimiento"
            name="fechaNacimiento"
            rules={[
              { required: true, message: "Por favor, ingrese la fecha de nacimiento" },
              { pattern: /^\d{2}\/\d{2}\/\d{4}$/, message: "Formato inválido, use DD/MM/YYYY" },
            ]}
          >
            <InputMask
              mask="99/99/9999"
              placeholder="DD/MM/YYYY"
              className="input-fecha-cliente"
              inputMode="numeric"
              pattern="\d*"
            />
          </Form.Item>

          <div className="group-nacionalidad-destino">
            <Form.Item label="Nacionalidad" name="nacionalidadPasajero">
              <Input placeholder="Ingrese la nacionalidad" maxLength={11} />
            </Form.Item>
            <Form.Item label="Destino" name="destinoPasajero">
              <Input placeholder="Ingrese el destino" maxLength={12} />
            </Form.Item>
          </div>

          <Form.Item label="Sexo" name="sexo">
            <Radio.Group onChange={onChangeSexo} value={value}>
              <Radio value={1}>Masculino</Radio>
              <Radio value={2}>Femenino</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>


    </div>
  );
}
