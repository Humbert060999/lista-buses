import "./VentanaCliente.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PDFDownloadLink, pdf, PDFViewer } from "@react-pdf/renderer";
import ConvertirPDF from "../convertPDF/ConvertirPDF";
import {
  Input,
  Form,
  Button,
  Select,
  Modal,
  Radio,
  message,
  Table,
  Popconfirm,
  Steps,
} from "antd";
import {
  RollbackOutlined,
  DownloadOutlined,
  PrinterOutlined,
  DeleteOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import InputMask from "react-input-mask";
import axios from "axios";
import { API_URL } from "../../api";

const { confirm } = Modal;

export default function VentanaCliente() {

  const navigate = useNavigate();
  const [showDownloadLink, setShowDownloadLink] = useState(false);
  const [data, setData] = useState([]);
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [licencia, setLicencia] = useState("");
  const [value, setValue] = useState(1);
  const [listPasajeros, setListPasajeros] = useState([]);
  const [scrollY, setScrollY] = useState(450);
  const [contadorKey, setContadorKey] = useState(1);
  const [current, setCurrent] = useState(0);

  const location = useLocation();

  const datosViaje = location.state?.viaje || null;
  const modo = datosViaje ? "editar" : "crear";

  const columsTablePasajeros = [
    { title: "CI", dataIndex: "ci", key: "ci", width: 75 },
    { title: "Nombre", dataIndex: "nombre", key: "nombre", width: 100 },
    { title: "Apellidos", dataIndex: "apellido", key: "apellido", width: 100 },
    {
      title: "Acción",
      key: "accion",
      width: 120,
      render: (_, record) =>
        listPasajeros.length > 0 ? (
          <Popconfirm
            title="¿Está seguro de eliminar?"
            okText="Sí"
            cancelText="Cancelar"
            onConfirm={() => handleDeletePasajeros(record.key)}
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
              Eliminar
            </Button>
          </Popconfirm>
        ) : null,
    },
  ];

  const handleDeletePasajeros = (key) => {
    setListPasajeros((prev) => prev.filter((item) => item.key !== key));
    message.success("El pasajero fue eliminado");
  };

  useEffect(() => {
    form2.setFieldsValue({ sexo: 1 });

    // Si viene en modo edición, llenar el formulario
    if (datosViaje) {
      form.setFieldsValue(datosViaje);
    }

    // Función para actualizar el scroll según el tamaño de la pantalla
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
  }, [form2, form, listPasajeros, datosViaje]);


  const origenes = [
    {
      value: "Cochabamba",
      label: "Cochabamba",
    },
    {
      value: "Santa Cruz",
      label: "Santa Cruz",
    },
    {
      value: "Iquique",
      label: "Iquique",
    },
  ];

  const destinos = [
    {
      value: "Cochabamba",
      label: "Cochabamba",
    },
    {
      value: "Santa Cruz",
      label: "Santa Cruz",
    },
    {
      value: "Iquique",
      label: "Iquique",
    },
  ];

  const listaDatos = [
    { licencia: "12345", nombres: "Juan", apellidos: "Pérez" },
    { licencia: "67890", nombres: "María", apellidos: "Gómez" },
    { licencia: "12714653", nombres: "HUMBERTO", apellidos: "LUCANA MAMANI" },
  ];

  const listaCamiones = [
    {
      placa: "ABC123",
      resolucionChilena: "Res-001",
      vence: "2024-12-31",
      modelo: "Modelo X",
      anio: 2022,
      polizaSeguro: "Pol-123456",
      VTO: "2025-06-30",
      chasis: "CHS-123456",
      motor: "MTR-654321",
    },
    {
      placa: "DEF456",
      resolucionChilena: "Res-002",
      vence: "2025-01-15",
      modelo: "Modelo Y",
      anio: 2023,
      polizaSeguro: "Pol-789012",
      VTO: "2025-07-15",
      chasis: "CHS-789012",
      motor: "MTR-987654",
    },
    {
      placa: "2357BKA",
      resolucionChilena: "Res-003",
      vence: "2024-11-30",
      modelo: "Modelo Z",
      anio: 2021,
      polizaSeguro: "Pol-345678",
      VTO: "2025-08-01",
      chasis: "CHS-345678",
      motor: "MTR-123456",
    },
  ];

  const listaCamionesSelect = [
    { value: "ABC123", label: "ABC123" },
    { value: "DEF456", label: "DEF456" },
    { value: "2357BKA", label: "2357BKA" },
  ];

  // Buscamos el ultimo id para seguir el orden de los indentificadores
  // Función que devuelve una promesa con el nuevo ID
  const buscarUltimoId = async () => {
    const res = await axios.get(`${API_URL}/viajes`);
    const viajes = res.data;


    let ultimoId = 0;
    if (viajes.length > 0) {
      const numeros = viajes.map(v => parseInt(v.id.split("-")[1], 10));
      ultimoId = Math.max(...numeros);
    }

    const nuevoId = `viaje-${String(ultimoId + 1).padStart(3, "0")}`;
    return nuevoId;
  };

  const registrarDatos = async (values) => {
    try {
      // Fecha actual en formato dd-mm-aaaa
      const fechaHoy = new Date();
      const fechaActualFormateada = fechaHoy.toLocaleDateString("es-ES");

      // Fecha de vencimiento formateada (siempre dd-mm-aaaa)
      const fechaVenceCamionFormateada = values.venceCamion
        ? values.venceCamion.split("-").reverse().join("-")
        : "";

      // Si es crear → buscar nuevo ID
      let idFinal = datosViaje ? datosViaje.id : await buscarUltimoId();

      // Construcción del objeto de datos
      const datosViajeNuevo = {
        id: idFinal,
        origen: values.origen,
        destino: values.destino,
        placa: values.placa,
        fechaViaje: datosViaje ? values.fechaViaje : fechaActualFormateada,
        horaViaje: values.horaViaje,

        licencia1: values.licencia1,
        nombresConductor1: values.nombresConductor1,
        apellidosConductor1: values.apellidosConductor1,

        licencia2: values.licencia2,
        nombresConductor2: values.nombresConductor2,
        apellidosConductor2: values.apellidosConductor2,

        resolucionChilena: values.resolucionChilena,
        venceCamion: fechaVenceCamionFormateada,
        modeloCamion: values.modeloCamion,
        anioCamion: values.anioCamion,
        polizaCamion: values.polizaCamion,
        vtoCamion: values.vtoCamion,
        chasisCamion: values.chasisCamion,
        motorCamion: values.motorCamion,
      };

      // Guardar en json-server (crear o actualizar)
      if (datosViaje) {
        await axios.put(`${API_URL}/viajes/${idFinal}`, datosViajeNuevo);
        message.success("El viaje se actualizó correctamente");
      } else {
        await axios.post(`${API_URL}/viajes`, datosViajeNuevo);
        message.success("El viaje se guardó correctamente");
      }

      form.resetFields();
      viewHome();
    } catch (error) {
      console.error("Error al registrar/actualizar viaje:", error);
      message.error("Ocurrió un error al guardar el viaje");
    }
  };



  const handleLicenciaChange1 = (e) => {
    const valor = e.target.value;
    setLicencia(valor);

    // Buscar si la licencia existe en la lista
    const datos = listaDatos.find((item) => item.licencia === valor);

    if (datos) {
      // Si se encuentra, llenar los otros campos usando form.setFieldValue
      form.setFieldsValue({
        nombresConductor1: datos.nombres,
        apellidosConductor1: datos.apellidos,
      });
    } else {
      // Si no se encuentra, limpiar los campos
      form.setFieldsValue({
        nombresConductor1: "",
        apellidosConductor1: "",
      });
    }
  };

  const handleLicenciaChange2 = (e) => {
    const valor = e.target.value;
    setLicencia(valor);

    // Buscar si la licencia existe en la lista
    const datos = listaDatos.find((item) => item.licencia === valor);

    if (datos) {
      // Si se encuentra, llenar los otros campos usando form.setFieldValue
      form.setFieldsValue({
        nombresConductor2: datos.nombres,
        apellidosConductor2: datos.apellidos,
      });
    } else {
      // Si no se encuentra, limpiar los campos
      form.setFieldsValue({
        nombresConductor2: "",
        apellidosConductor2: "",
      });
    }
  };

  const buscarPlacaCamiones = (e) => {
    const datos = listaCamiones.find((item) => item.placa === e);
    if (datos) {
      // Si se encuentra, llenar los otros campos usando form.setFieldValue
      form.setFieldsValue({
        modeloCamion: datos.modelo,
        polizaCamion: datos.polizaSeguro,
        resolucionChilena: datos.resolucionChilena, // Incluye el campo de resolución
        vtoCamion: datos.VTO,
        venceCamion: datos.vence,
        chasisCamion: datos.chasis,
        motorCamion: datos.motor,
        anioCamion: datos.anio,
      });
    } else {
      // Si no se encuentra, limpiar los campos
      form.setFieldsValue({
        modeloCamion: "",
        polizaCamion: "",
        resolucionChilena: "",
        vtoCamion: "",
        venceCamion: "",
        chasisCamion: "",
        motorCamion: "",
        anioCamion: "", // Cambiado de año a anio
      });
    }
  };

  const [viewModal, setViewModal] = useState(false);

  const viewFormCustomer = () => {
    setViewModal(true);
  };

  const closeModal = () => {
    setViewModal(false);
  };

  const showCloseConfirm = () => {
    closeModal();
    form2.resetFields();
    form2.setFieldsValue({ sexo: 1 });
  };

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const guardarDatosPasajeros = (date) => {
    console.log("Datos insertados:", date);

    const pasajeroConKey = {
      ...date,
      key: contadorKey,
    };

    setListPasajeros((prevData) => [...prevData, pasajeroConKey]);
    setContadorKey((prev) => prev + 1);

    form2.resetFields();
    form2.setFieldsValue({ sexo: 1 });
    message.success("El pasajero se añadió correctamente");
    closeModal();
  };

  const viewHome = () => {
    console.log("volver al inicio")
    navigate("/inicio");
  };

  const imprimirDocumento = async () => {
    try {
      // Hacer copias de los datos actuales para asegurar que estén completos
      const datosActuales = JSON.parse(JSON.stringify(data));
      const pasajerosActuales = JSON.parse(JSON.stringify(listPasajeros));

      // Crear instancia del PDF
      const pdfInstance = pdf(
        <ConvertirPDF data={datosActuales} dataPasajeros={pasajerosActuales} />
      );

      // Generar el blob del PDF
      const blob = await pdfInstance.toBlob();
      const blobUrl = URL.createObjectURL(blob);

      // Abrir nueva ventana para imprimir
      const printWindow = window.open(blobUrl, "_blank");

      if (!printWindow) {
        alert("Por favor, permite ventanas emergentes para imprimir el PDF.");
        return;
      }

      // Cuando la ventana cargue, abrir el diálogo de impresión
      printWindow.onload = () => {
        printWindow.focus();
        printWindow.print();
      };
    } catch (error) {
      console.error("Error generando o imprimiendo el PDF:", error);
    }
  };

  const mostrarErrorFormBus = () => {
    message.warning("Faltan llenar campos obligatorios");
  };

  const steps = [
    {
      title: "Formulario del Bus",
      content: (
        <>
          <h2>Formulario de viaje</h2>
          <Form
            form={form}
            layout="vertical"
            onFinish={registrarDatos}
            onFinishFailed={mostrarErrorFormBus}
            className="formulario-cliente"
          >
            <div className="linea-con-texto">
              <span>
                <b>Datos del viaje</b>
              </span>
            </div>
            <div className="datos-viaje">
              <div className="datos-viaje-uno">
                <Form.Item
                  label="Origen"
                  name="origen"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, seleccione el origen",
                    },
                  ]}
                >
                  <Select
                    placeholder="Seleccione el origen"
                    optionFilterProp="label"
                    options={origenes}
                  />
                </Form.Item>
                <Form.Item
                  label="Destino"
                  name="destino"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, seleccione el destino",
                    },
                  ]}
                >
                  <Select
                    placeholder="Seleccione el destino"
                    optionFilterProp="label"
                    options={destinos}
                  />
                </Form.Item>
              </div>
              <div className="datos-viaje-dos">
                <Form.Item label="Fecha de viaje" name="fechaViaje">
                  <input
                    type="date"
                    id="fecha"
                    placeholder="Seleccione la fecha de viaje"
                    className="input-estilo"
                    defaultValue={new Date().toISOString().split("T")[0]}
                    readOnly
                  />
                </Form.Item>
                <Form.Item
                  label="Hora de salida"
                  name="horaViaje"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, seleccione la hora de salida",
                    },
                  ]}
                >
                  <input type="time" id="hora" className="input-estilo" />
                </Form.Item>
              </div>
            </div>
            <div class="linea-con-texto">
              <span>
                <b>Datos de los conductores</b>
              </span>
            </div>
            <div className="datos-conductor">
              <div className="datos-conductor-uno">
                <Form.Item
                  label="Licencia del conductor 1"
                  name="licencia1"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, ingrese la licencia del conductor 1",
                    },
                    {
                      pattern: /^[0-9]{1,9}$/,
                      message: "Solo números, máximo 9 dígitos",
                    },
                  ]}
                >
                  <Input
                    value={licencia}
                    onChange={handleLicenciaChange1}
                    placeholder="Ingrese el número de licencia"
                    maxLength={9}
                    inputMode="numeric"
                    pattern="[0-9]*"
                  />
                </Form.Item>
                <Form.Item
                  label="Nombres del conductor 1"
                  name="nombresConductor1"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, ingrese los nombres del conductor 1",
                    },
                  ]}
                >
                  <Input placeholder="Ingrese los nombres" />
                </Form.Item>
                <Form.Item
                  label="Apellidos del conductor 1"
                  name="apellidosConductor1"
                  rules={[
                    {
                      required: true,
                      message:
                        "Por favor, ingrese los apellidos del conductor 1",
                    },
                  ]}
                >
                  <Input placeholder="Ingrese los apellidos" />
                </Form.Item>
              </div>
              <div className="datos-conductor-dos">
                <Form.Item
                  label="Licencia del conductor 2"
                  name="licencia2"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, ingrese la licencia del conductor 2",
                    },
                    {
                      pattern: /^[0-9]{1,9}$/,
                      message: "Solo números, máximo 9 dígitos",
                    },
                  ]}
                >
                  <Input
                    value={licencia}
                    onChange={handleLicenciaChange2}
                    placeholder="Ingrese el número de licencia"
                    maxLength={9}
                    inputMode="numeric"
                    pattern="[0-9]*"
                  />
                </Form.Item>
                <Form.Item
                  label="Nombres del conductor 2"
                  name="nombresConductor2"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, ingrese los nombres del conductor 2",
                    },
                  ]}
                >
                  <Input placeholder="Ingrese los nombres" />
                </Form.Item>
                <Form.Item
                  label="Apellidos del conductor 2"
                  name="apellidosConductor2"
                  rules={[
                    {
                      required: true,
                      message:
                        "Por favor, ingrese los apellidos del conductor 2",
                    },
                  ]}
                >
                  <Input placeholder="Ingrese los apellidos" />
                </Form.Item>
              </div>
            </div>

            <div class="linea-con-texto">
              <span>
                <b>Datos del bus</b>
              </span>
            </div>

            <div className="datos-bus">
              <div className="datos-bus-uno">
                <Form.Item
                  label="Placa o Patente N°"
                  name="placa"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, ingrese la placa o patente",
                    },
                  ]}
                >
                  <Select
                    onChange={buscarPlacaCamiones}
                    allowClear
                    placeholder="Seleccione la placa"
                    options={listaCamionesSelect}
                  />
                </Form.Item>
                <Form.Item
                  label="Resolución chilena exenta N°"
                  name="resolucionChilena"
                >
                  <Input readOnly />
                </Form.Item>
                <Form.Item label="Vence" name="venceCamion">
                  <Input readOnly />
                </Form.Item>
                <Form.Item label="Modelo" name="modeloCamion">
                  <Input readOnly />
                </Form.Item>
                <Form.Item label="Año" name="anioCamion">
                  <Input readOnly />
                </Form.Item>
              </div>
              <div className="datos-bus-dos">
                <Form.Item label="Poliza de seguro" name="polizaCamion">
                  <Input readOnly />
                </Form.Item>
                <Form.Item label="VTO" name="vtoCamion">
                  <Input readOnly />
                </Form.Item>
                <Form.Item label="Chasis" name="chasisCamion">
                  <Input readOnly />
                </Form.Item>
                <Form.Item label="Motor" name="motorCamion">
                  <Input readOnly />
                </Form.Item>
                {/* <div className="datos-bus-button-finalizar">
                  <Button type="primary" htmlType="submit">
                    Finalizar
                  </Button>
                </div> */}
              </div>
            </div>
          </Form>
        </>
      ),
    },
    {
      title: "Lista de Pasajeros",
      content: (
        <>
          {/* Tabla para mostrar la lista de los pasajeros que se van añadiendo */}
          <div>
            <h2 style={{ textAlign: "center" }}>Lista de pasajeros</h2>
            <Button onClick={viewFormCustomer}>Añadir pasajero</Button>
            <div className="cliente-tabla-pasajeros">
              <Table
                columns={columsTablePasajeros}
                dataSource={listPasajeros}
                pagination={false}
                className="tabla-pasajeros"
                scroll={{ y: 220 }}
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
          </div>
        </>
      ),
    },
    {
      title: "Impresion y descarga",
      content: (
        <>
          {showDownloadLink && (
            <div className="group-buttons-descargar">
              <PDFDownloadLink
                document={
                  <ConvertirPDF data={data} dataPasajeros={listPasajeros} />
                }
                fileName="datos-viaje.pdf"
                className="button-download"
              >
                {({ loading }) => (
                  <span className="pdf-text">
                    <DownloadOutlined style={{ paddingRight: "10px" }} />
                    {loading ? "Generando PDF..." : "Descargar PDF"}
                  </span>
                )}
              </PDFDownloadLink>
              <Button
                size="large"
                type="primary"
                icon={<PrinterOutlined />}
                style={{ backgroundColor: "#595959", color: "white" }}
                onClick={imprimirDocumento}
              >
                Imprimir
              </Button>
            </div>
          )}
          <div
            style={{
              height: "600px",
              border: "1px solid #ccc",
              marginBottom: "20px",
            }}
          >
            <PDFViewer width="100%" height="100%">
              <ConvertirPDF data={data} dataPasajeros={listPasajeros} />
            </PDFViewer>
          </div>
        </>
      ),
    },
  ];

  const next = () => {
    setCurrent(current + 1);
    setShowDownloadLink(true);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <div className="contenedor-principal-cliente">
      <Button className="cliente-button-back" onClick={viewHome} type="primary">
        <RollbackOutlined />
        <span className="cliente-button-text">Atrás</span>
      </Button>
      {/* <Steps current={current} items={items} className="steps" />
      <div className="main-steps">{steps[current].content}</div>
      <div className="steps-buttons">
        {current > 0 && (
          <Button style={{ marginRight: 8 }} onClick={() => prev()}>
            Anterior
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => {
              if (current === 0) {
                form.submit();
              } else {
                next();
              }
            }}
          >
            Siguiente
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => {
              message.success("¡Se guardo correctamente!");
              navigate("/inicio");
            }}
          >
            Finalizar
          </Button>
        )}
      </div> */}
      <h2>Formulario de viaje</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={registrarDatos}
        onFinishFailed={mostrarErrorFormBus}
        className="formulario-cliente"
      >
        <div className="linea-con-texto">
          <span>
            <b>Datos del viaje</b>
          </span>
        </div>
        <div className="datos-viaje">
          <div className="datos-viaje-uno">
            <Form.Item
              label="Origen"
              name="origen"
              rules={[
                {
                  required: true,
                  message: "Por favor, seleccione el origen",
                },
              ]}
            >
              <Select
                placeholder="Seleccione el origen"
                optionFilterProp="label"
                options={origenes}
              />
            </Form.Item>
            <Form.Item
              label="Destino"
              name="destino"
              rules={[
                {
                  required: true,
                  message: "Por favor, seleccione el destino",
                },
              ]}
            >
              <Select
                placeholder="Seleccione el destino"
                optionFilterProp="label"
                options={destinos}
              />
            </Form.Item>
          </div>
          <div className="datos-viaje-dos">
            <Form.Item label="Fecha de viaje" name="fechaViaje">
              <input
                type="date"
                id="fecha"
                placeholder="Seleccione la fecha de viaje"
                className="input-estilo"
                defaultValue={new Date().toISOString().split("T")[0]}
                readOnly
              />
            </Form.Item>
            <Form.Item
              label="Hora de salida"
              name="horaViaje"
              rules={[
                {
                  required: true,
                  message: "Por favor, seleccione la hora de salida",
                },
              ]}
            >
              <input type="time" id="hora" className="input-estilo" />
            </Form.Item>
          </div>
        </div>
        <div class="linea-con-texto">
          <span>
            <b>Datos de los conductores</b>
          </span>
        </div>
        <div className="datos-conductor">
          <div className="datos-conductor-uno">
            <Form.Item
              label="Licencia del conductor 1"
              name="licencia1"
              rules={[
                {
                  required: true,
                  message: "Por favor, ingrese la licencia del conductor 1",
                },
                {
                  pattern: /^[0-9]{1,9}$/,
                  message: "Solo números, máximo 9 dígitos",
                },
              ]}
            >
              <Input
                value={licencia}
                onChange={handleLicenciaChange1}
                placeholder="Ingrese el número de licencia"
                maxLength={9}
                inputMode="numeric"
                pattern="[0-9]*"
              />
            </Form.Item>
            <Form.Item
              label="Nombres del conductor 1"
              name="nombresConductor1"
              rules={[
                {
                  required: true,
                  message: "Por favor, ingrese los nombres del conductor 1",
                },
              ]}
            >
              <Input placeholder="Ingrese los nombres" />
            </Form.Item>
            <Form.Item
              label="Apellidos del conductor 1"
              name="apellidosConductor1"
              rules={[
                {
                  required: true,
                  message:
                    "Por favor, ingrese los apellidos del conductor 1",
                },
              ]}
            >
              <Input placeholder="Ingrese los apellidos" />
            </Form.Item>
          </div>
          <div className="datos-conductor-dos">
            <Form.Item
              label="Licencia del conductor 2"
              name="licencia2"
              rules={[
                {
                  required: true,
                  message: "Por favor, ingrese la licencia del conductor 2",
                },
                {
                  pattern: /^[0-9]{1,9}$/,
                  message: "Solo números, máximo 9 dígitos",
                },
              ]}
            >
              <Input
                value={licencia}
                onChange={handleLicenciaChange2}
                placeholder="Ingrese el número de licencia"
                maxLength={9}
                inputMode="numeric"
                pattern="[0-9]*"
              />
            </Form.Item>
            <Form.Item
              label="Nombres del conductor 2"
              name="nombresConductor2"
              rules={[
                {
                  required: true,
                  message: "Por favor, ingrese los nombres del conductor 2",
                },
              ]}
            >
              <Input placeholder="Ingrese los nombres" />
            </Form.Item>
            <Form.Item
              label="Apellidos del conductor 2"
              name="apellidosConductor2"
              rules={[
                {
                  required: true,
                  message:
                    "Por favor, ingrese los apellidos del conductor 2",
                },
              ]}
            >
              <Input placeholder="Ingrese los apellidos" />
            </Form.Item>
          </div>
        </div>

        <div class="linea-con-texto">
          <span>
            <b>Datos del bus</b>
          </span>
        </div>

        <div className="datos-bus">
          <div className="datos-bus-uno">
            <Form.Item
              label="Placa o Patente N°"
              name="placa"
              rules={[
                {
                  required: true,
                  message: "Por favor, ingrese la placa o patente",
                },
              ]}
            >
              <Select
                onChange={buscarPlacaCamiones}
                allowClear
                placeholder="Seleccione la placa"
                options={listaCamionesSelect}
              />
            </Form.Item>
            <Form.Item
              label="Resolución chilena exenta N°"
              name="resolucionChilena"
            >
              <Input readOnly />
            </Form.Item>
            <Form.Item label="Vence" name="venceCamion">
              <Input readOnly />
            </Form.Item>
            <Form.Item label="Modelo" name="modeloCamion">
              <Input readOnly />
            </Form.Item>
            <Form.Item label="Año" name="anioCamion">
              <Input readOnly />
            </Form.Item>
          </div>
          <div className="datos-bus-dos">
            <Form.Item label="Poliza de seguro" name="polizaCamion">
              <Input readOnly />
            </Form.Item>
            <Form.Item label="VTO" name="vtoCamion">
              <Input readOnly />
            </Form.Item>
            <Form.Item label="Chasis" name="chasisCamion">
              <Input readOnly />
            </Form.Item>
            <Form.Item label="Motor" name="motorCamion">
              <Input readOnly />
            </Form.Item>
            <div className="datos-bus-button-finalizar">
              <Button type="primary" htmlType="submit">
                Guardar
              </Button>
            </div>
          </div>
        </div>
      </Form>

      {/* Modal para mostrar el formulario de registro de los pasajeros */}
      <Modal
        title={<h3 style={{ textAlign: "center" }}>Formulario de pasajero</h3>}
        open={viewModal}
        onOk={() => form2.submit()}
        onCancel={showCloseConfirm}
        okText="Guardar"
        cancelText="Cerrar"
        width="90%"
        className="form-pasajeros-container"
      >
        <Form form={form2} layout="vertical" onFinish={guardarDatosPasajeros}>
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
              {
                pattern: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
                message: "Solo se permiten letras",
              },
            ]}
          >
            <Input placeholder="Ingrese nombre(s)" maxLength={22} />
          </Form.Item>
          <Form.Item
            label="Apellido"
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
          <div className="group-nacionalidad-destino">
            <Form.Item label="Nacionalidad" name="nacionalidadPasajero">
              <Input placeholder="Ingrese la nacionalidad" maxLength={11} />
            </Form.Item>
            <Form.Item label="Destino" name="destinoPasajero">
              <Input placeholder="Ingrese el destino" maxLength={12} />
            </Form.Item>
          </div>
          <Form.Item label="Sexo" name="sexo">
            <Radio.Group onChange={onChange} value={value}>
              <Radio value={1}>Masculino</Radio>
              <Radio value={2}>Femenino</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
