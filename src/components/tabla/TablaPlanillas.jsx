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
  Select,
  InputNumber,
  Popconfirm,
} from "antd";
import {
  DownloadOutlined,
  EditOutlined,
  PlusOutlined,
  SolutionOutlined,
  InboxOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
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
  const [modalListPassengers, setModalListPassengers] = useState(false);
  const [formPasajeros] = Form.useForm();
  const [listPasajeros, setListPasajeros] = useState([]);
  const [contadorKey, setContadorKey] = useState(1);
  const [value, setValue] = useState(1);
  // Guardar el id del viaje al que se añade pasajero
  const [viajeSeleccionado, setViajeSeleccionado] = useState(null);
  const [asientosSeleccionados, setAsientosSeleccionados] = useState([]);
  const [asientos, setAsientos] = useState([]);
  const [layoutTable, setLayoutTable] = useState("fixed");
  const [sizeButtons, setSizeButtons] = useState("default");
  const [currentFormIndex, setCurrentFormIndex] = useState(0);
  const [sizeModalListPassenger, setSizeModalListPasengger] = useState("50%");
  // base de datos de prueba
  const [viajes, setViajes] = useState([]);

  useEffect(() => {
    const width = window.innerWidth;
    if (width < 768) {
      setLayoutTable("auto");
      setSizeButtons("large");
      setSizeModalListPasengger("95%");
    }
    widthTableInitial();
  });

  const widthTableInitial = () => {
    const width = window.innerWidth;
    if (width < 768) {
      return widthTablePhone;
    } else {
      return widthTable;
    }
  };
  const widthTable = {
    widthColumn1: 15,
    widthColumn2: 20,
    widthColumn3: 30,
    widthColumn4: 20,
    widthColumn5: 60,
  };

  const widthTablePhone = {
    widthColumn1: 10,
    widthColumn2: 10,
    widthColumn3: 10,
    widthColumn4: 10,
    widthColumn5: 10,
  };

  const columnsTrips = [
    {
      title: "Placa",
      dataIndex: "placa",
      key: "placa",
      width: widthTableInitial().widthColumn1,
    },
    {
      title: "Hora Salida",
      dataIndex: "horaViaje",

      key: "horaViaje",
      width: widthTableInitial().widthColumn2,
    },
    {
      title: "Conductor",
      key: "conductor1",
      width: widthTableInitial().widthColumn3,
      render: (text, record) =>
        `${record.nombresConductor1 || ""} ${record.apellidosConductor1 || ""}`,
    },
    {
      title: "Destino",
      dataIndex: "destino",
      key: "destino",
      width: widthTableInitial().widthColumn4,
      render: (estado) => (
        <span style={{ color: estado === "Listo" ? "green" : "red" }}>
          {estado}
        </span>
      ),
    },
    {
      title: "Opciones",
      key: "opciones",
      width: widthTableInitial().widthColumn5,
      render: (text, record) => (
        <Space className="tabla-buttons">
          <Button
            onClick={() => aniadirPasajero(record.id)}
            style={{ backgroundColor: "#13c2c2", color: "#ffff" }}
            icon={<PlusOutlined />}
            shape="round"
            size={sizeButtons}
          >
            Añadir pasajero
          </Button>
          <Button
            onClick={() => viewListPassengers(record.id)}
            style={{ backgroundColor: "#6c6c6ce7", color: "#ffff" }}
            icon={<SolutionOutlined />}
            shape="round"
            size={sizeButtons}
          >
            Ver pasajeros
          </Button>
          <Button
            type="primary"
            shape="round"
            icon={<DownloadOutlined />}
            size={sizeButtons}
            onClick={() => downloadDocument(record.id)}
          >
            Descargar
          </Button>
          <Button
            onClick={() => editRegister(record.id)}
            icon={<EditOutlined />}
            shape="round"
            size={sizeButtons}
          >
            Editar
          </Button>
        </Space>
      ),
    },
  ];

  // Opciones de las nacionalidades
  const optionsNationalities = [
    { value: "Argentina", label: "Argentina" },
    { value: "Bolivia", label: "Bolivia" },
    { value: "Brasil", label: "Brasil" },
    { value: "Chile", label: "Chile" },
    { value: "Colombia", label: "Colombia" },
    { value: "Cuba", label: "Cuba" },
    { value: "Ecuador", label: "Ecuador" },
    { value: "El Salvador", label: "El Salvador" },
    { value: "Guatemala", label: "Guatemala" },
    { value: "Honduras", label: "Honduras" },
    { value: "México", label: "México" },
    { value: "Nicaragua", label: "Nicaragua" },
    { value: "Panamá", label: "Panamá" },
    { value: "Paraguay", label: "Paraguay" },
    { value: "Perú", label: "Perú" },
    { value: "Uruguay", label: "Uruguay" },
    { value: "Venezuela", label: "Venezuela" },
  ];

  // Opciones de los destinos
  const optionsDestination = [
    { value: "Oruro", label: "Oruro" },
    { value: "Cochabamba", label: "Cochabamba" },
    { value: "Iquique", label: "Iquique" },
    { value: "Calama", label: "Calama" },
    { value: "Santiago", label: "Santiago" },
    { value: "Antofagasta", label: "Antofagasta" },
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

  const editRegister = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/viajes/${id}`);
      const data = response.data;

      // 🔹 Convertir los campos de conductores a una lista
      const listaConductores = [];
      for (let i = 1; i <= 4; i++) {
        // máximo 4 conductores según tu lógica
        const license = data[`licencia${i}`];
        const nombres = data[`nombresConductor${i}`];
        const apellidos = data[`apellidosConductor${i}`];

        if (license && nombres && apellidos) {
          listaConductores.push({ license, nombres, apellidos });
        }
      }
      console.log(
        "los datos recuperados de conductores son, ",
        listaConductores
      );
      // Navegar al formulario en modo edición y pasar listaConductores
      navigate("/formulario", { state: { viaje: data, listaConductores } });
    } catch (error) {
      console.error("Error al recuperar el viaje:", error);
      message.error("No se pudo recuperar el viaje");
    }
  };

  // Función para convertir fecha ISO a dd-MM-yyyy
  const formatDateToDDMMYYYY = (isoDate) => {
    if (!isoDate) return "";
    const [year, month, day] = isoDate.split("-");
    return `${day}-${month}-${year}`;
  };

  // Función para descargar el documento PDF
  const downloadDocument = async (id) => {
    try {
      // 1. Buscar el viaje
      const datosViaje = viajes.find((v) => v.id === id);

      if (!datosViaje) {
        message.error("No se encontró el viaje");
        return;
      }

      // 2. Traer pasajeros desde json-server
      const res = await fetch(`${API_URL}/pasajeros?idViaje=${id}`);
      const pasajerosViaje = await res.json();

      if (pasajerosViaje.length === 0) {
        message.warning("No hay pasajeros para este viaje");
        return;
      }

      // 3. Clonar datosViaje y formatear fechas para el PDF
      const datosViajePDF = { ...datosViaje };
      datosViajePDF.fechaViaje = formatDateToDDMMYYYY(datosViaje.fechaViaje);
      datosViajePDF.venceCamion = formatDateToDDMMYYYY(datosViaje.venceCamion);

      // 4. Crear PDF
      const pdfInstance = pdf(
        <ConvertirPDF data={datosViajePDF} dataPasajeros={pasajerosViaje} />
      );

      // 5. Generar blob y descargar
      const blob = await pdfInstance.toBlob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `viaje-${id}.pdf`;
      link.click();
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error generating PDF:", error);
      message.error("No se pudo generar el PDF");
    }
  };

  // Función para añadir pasajeros
  const aniadirPasajero = async (id) => {
    setViajeSeleccionado(id); // guardamos a qué viaje pertenece

    // 1. Obtener el viaje con su capacidad
    const viajeRes = await fetch(`${API_URL}/viajes/${id}`);
    const viaje = await viajeRes.json();

    const capacidadBus = viaje.capacidadBus || 60;

    // 2. Obtener pasajeros de ese viaje
    const pasajerosRes = await fetch(`${API_URL}/pasajeros?idViaje=${id}`);
    const pasajerosViaje = await pasajerosRes.json();

    // 3. Construir lista de asientos dinámicamente
    const nuevosAsientos = Array.from({ length: capacidadBus }, (_, i) => {
      const nroAsiento = i + 1;
      const ocupado = pasajerosViaje.find((p) => p.nroAsiento === nroAsiento);
      return {
        nroAsiento,
        estado: ocupado ? "vendido" : "disponible",
      };
    });

    setAsientos(nuevosAsientos);
    setModalVisible(true);
  };

  const viewListPassengers = async (id) => {
    try {
      const res = await fetch(`${API_URL}/pasajeros?idViaje=${id}`);
      const pasajeros = await res.json();

      if (pasajeros.length === 0) {
        message.warning("No hay pasajeros para este viaje");
        return;
      }
      setListPasajeros(pasajeros);
      setModalListPassengers(true);
    } catch (error) {
      console.error("Error al obtener pasajeros:", error);
      message.error("No se pudo recuperar la lista de pasajeros");
    }
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
    const seleccionados = asientos.filter((a) => a.estado === "seleccionado");

    // 2. Extraer los números correctos
    const numerosAsientos = seleccionados.map((a) => a.nroAsiento);

    if (numerosAsientos.length === 0) {
      message.warning("Debe seleccionar al menos un asiento.");
      return; // 👉 se detiene aquí si no hay asientos
    }

    // 3. Guardamos en estado los asientos seleccionados
    setAsientosSeleccionados(numerosAsientos);

    // 4. Cerrar modal de asientos y abrir modal de formulario pasajero
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
      await fetch(`${API_URL}/pasajeros`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pasajero),
      });
      message.success(
        `Pasajero del asiento ${pasajero.nroAsiento} añadido correctamente`
      );

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
    formPasajeros.resetFields();
    formPasajeros.setFieldsValue({ sexo: 1 });
    setModalFormPasajero(false);
  };

  const closeModalListPassengers = () => {
    setModalListPassengers(false);
  };

  const onChangeSexo = (e) => {
    setValue(e.target.value);
  };

  const columsTablePasajeros = [
    {
      title: "Nro Asiento",
      dataIndex: "nroAsiento",
      key: "nroAsiento",
      width: 100,
    },
    { title: "CI", dataIndex: "ci", key: "ci", width: 120 },
    { title: "Nombre", dataIndex: "nombre", key: "nombre", width: 150 },
    { title: "Apellidos", dataIndex: "apellido", key: "apellido", width: 180 },
    {
      title: "Acción",
      key: "accion",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <Popconfirm
          title="¿Está seguro de eliminar?"
          okText="Sí"
          cancelText="Cancelar"
          onConfirm={() => handleDeletePasajeros(record.id)}
        >
          <Button type="link" danger icon={<DeleteOutlined />}>
            Eliminar
          </Button>
        </Popconfirm>
      ),
    },
  ];

  // Eliminar pasajero por id
  const handleDeletePasajeros = async (id) => {
    try {
      await axios.delete(`${API_URL}/pasajeros/${id}`);

      setListPasajeros((prev) => prev.filter((item) => item.id !== id));

      message.success("El pasajero fue eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar pasajero:", error);
      message.error("No se pudo eliminar el pasajero");
    }
  };

  return (
    <div>
      {mostrarTabla && (
        <div>
          <div className="group-title-button-new">
            <h2>Lista de viajes</h2>

            <Button
              type="primary"
              onClick={cambiarVentana}
              className="button-new-table"
            >
              Nuevo
            </Button>
          </div>
          <div className="table-container">
            <Table
              columns={columnsTrips}
              dataSource={viajes}
              tableLayout={layoutTable}
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
        width={window.innerWidth > 768 ? 1000 : "95%"}
        footer={[
          <Button key="cancel" onClick={() => setModalVisible(false)}>
            Cancelar
          </Button>,
          <Button key="ok" type="primary" onClick={handleConfirmarAsientos}>
            Confirmar
          </Button>,
        ]}
      >
        <div className="bus-container">
          {(window.innerWidth > 768 ? asientosEscritorio : asientos).map(
            (asiento) => (
              <div
                key={asiento.nroAsiento}
                className={`asiento ${asiento.estado}`}
                onClick={() =>
                  asiento.estado !== "vendido" &&
                  handleSeleccionar(asiento.nroAsiento)
                }
              >
                {asiento.nroAsiento}
              </div>
            )
          )}
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
          <div className="inputs-ci-pay">
            <Form.Item
              label="CI"
              name="ci"
              rules={[
                { required: true, message: "Por favor, ingresa el CI" },
                {
                  pattern: /^[0-9]{1,9}$/,
                  message: "Solo números, máximo 9 dígitos",
                },
              ]}
            >
              <Input
                placeholder="Ingrese su CI"
                maxLength={9}
                inputMode="numeric"
                pattern="[0-9]*"
              />
            </Form.Item>

            {/* <Form.Item
              label="Precio"
              name="precio"
              rules={[
                { required: true, message: "Ingrese un precio" },
                {
                  type: "number",
                  min: 0,
                  message: "El precio no puede ser negativo",
                },
              ]}
            >
              <InputNumber
                style={{ width: "100%" }}
                min={0}
                step={1}
                placeholder="Ingrese el precio"
                inputMode="numeric"
                formatter={(value) =>
                  `Bs. ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/Bs.\s?|(,*)/g, "")}
              />
            </Form.Item> */}
          </div>

          <Form.Item
            label="Nombres"
            name="nombre"
            rules={[
              { required: true, message: "Por favor, ingresa los nombres" },
              {
                pattern: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
                message: "Solo se permiten letras",
              },
            ]}
          >
            <Input placeholder="Ingrese nombre(s)" maxLength={22} />
          </Form.Item>

          <Form.Item
            label="Apellidos"
            name="apellido"
            rules={[
              { required: true, message: "Por favor, ingresa los apellidos" },
              {
                pattern: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
                message: "Solo se permiten letras",
              },
            ]}
          >
            <Input placeholder="Ingrese los apellidos" maxLength={22} />
          </Form.Item>

          <Form.Item
            label="Fecha de nacimiento"
            name="fechaNacimiento"
            rules={[
              {
                required: true,
                message: "Por favor, ingrese la fecha de nacimiento",
              },
              {
                pattern: /^\d{2}\/\d{2}\/\d{4}$/,
                message: "Formato inválido, use DD/MM/YYYY",
              },
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

          <div className="inputs-nationality-destination">
            <Form.Item
              label="Nacionalidad"
              name="nacionalidadPasajero"
              rules={[
                { required: true, message: "Por favor, seleccione una opcion" },
              ]}
            >
              <Select
                showSearch
                allowClear={true}
                placeholder="Seleccione la nacionalidad"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={optionsNationalities}
              />
            </Form.Item>
            <Form.Item
              label="Destino"
              name="destinoPasajero"
              rules={[
                { required: true, message: "Por favor, seleccione una opcion" },
              ]}
            >
              <Select
                allowClear={true}
                showSearch={false}
                placeholder="Seleccione el destino"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={optionsDestination}
              />
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

      {/* ver la lista de pasajeros */}
      <Modal
        open={modalListPassengers}
        onCancel={closeModalListPassengers}
        footer={null} // quitamos OK / Cancel porque ya tienes botón "Cerrar"
        width={sizeModalListPassenger} // más responsivo en móvil
        className="modal-list-passengers"
      >
        <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
          Lista de pasajeros
        </h2>
        <div className="cliente-tabla-pasajeros">
          <Table
            columns={columsTablePasajeros}
            dataSource={listPasajeros}
            pagination={false}
            className="tabla-pasajeros"
            size="small" // compacto
            scroll={{ y: 240, x: true }} // scroll horizontal en caso de overflow
            locale={{
              emptyText: (
                <div className="tabla-empty">
                  <InboxOutlined style={{ fontSize: 48, color: "#ccc" }} />
                  <p>No hay pasajeros agregados</p>
                </div>
              ),
            }}
          />
        </div>
      </Modal>
    </div>
  );
}
