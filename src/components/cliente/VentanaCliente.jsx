import "./VentanaCliente.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  List,
} from "antd";
import {
  RollbackOutlined,
  DeleteOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import InputMask from "react-input-mask";
import axios from "axios";
import { API_URL } from "../../api";

export default function VentanaCliente() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [value, setValue] = useState(1);
  const [listPasajeros, setListPasajeros] = useState([]);
  const [scrollY, setScrollY] = useState(450);
  const [contadorKey, setContadorKey] = useState(1);
  const [listaConductores, setListaConductores] = useState([]);
  const [viewModalPassengers, setViewModalPassengers] = useState(false);
  const location = useLocation();

  const datosViaje = location.state?.viaje || null;
  const conductoresDesdeState = location.state?.listaConductores || [];

  useEffect(() => {
    form2.setFieldsValue({ sexo: 1 });

    // Si viene en modo edición, llenar el formulario
    if (datosViaje) {
      form.setFieldsValue(datosViaje);

      // Usar listaConductores pasada por state si existe
      if (conductoresDesdeState.length > 0) {
        setListaConductores(conductoresDesdeState);
      } else {
        // Reconstruir lista de conductores desde datosViaje
        const conductores = [];
        for (let i = 1; i <= 4; i++) {
          const license = datosViaje[`license${i}`];
          const nombres = datosViaje[`nombresConductor${i}`];
          const apellidos = datosViaje[`apellidosConductor${i}`];
          if (license && nombres && apellidos) {
            conductores.push({ license, nombres, apellidos });
          }
        }
        setListaConductores(conductores);
      }
    }

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

  const origins = [
    {
      value: "Oruro",
      label: "Oruro",
    },
    {
      value: "Cochabamba",
      label: "Cochabamba",
    },
    {
      value: "Iquique",
      label: "Iquique",
    },
    {
      value: "Calama",
      label: "Calama",
    },
    {
      value: "Santiago",
      label: "Santiago",
    },
    {
      value: "Antofagasta",
      label: "Antofagasta",
    },
  ];

  const destination = [
    {
      value: "Oruro",
      label: "Oruro",
    },
    {
      value: "Cochabamba",
      label: "Cochabamba",
    },
    {
      value: "Iquique",
      label: "Iquique",
    },
    {
      value: "Calama",
      label: "Calama",
    },
    {
      value: "Santiago",
      label: "Santiago",
    },
    {
      value: "Antofagasta",
      label: "Antofagasta",
    },
  ];

  const listaDatos = [
    {
      license: "13718294",
      nombres: "Luis Mario",
      apellidos: "Ortega",
    },
  ];

  const listTrucks = [
    {
      placa: "JBXY57",
      resolucionChilena: "3258/2025",
      vence: "2025-07-22",
      modelo: "B450R",
      anio: 2017,
      polizaSeguro: "74-000000800142",
      VTO: "21-08-2026",
      chasis: "9BVT2T123GE385828",
      motor: "",
    },
    // {
    //   placa: "DEF456",
    //   resolucionChilena: "Res-002",
    //   vence: "2025-01-15",
    //   modelo: "Modelo Y",
    //   anio: 2023,
    //   polizaSeguro: "Pol-789012",
    //   VTO: "2025-07-15",
    //   chasis: "CHS-789012",
    //   motor: "MTR-987654",
    // },
    // {
    //   placa: "2357BKA",
    //   resolucionChilena: "Res-003",
    //   vence: "2024-11-30",
    //   modelo: "Modelo Z",
    //   anio: 2021,
    //   polizaSeguro: "Pol-345678",
    //   VTO: "2025-08-01",
    //   chasis: "CHS-345678",
    //   motor: "MTR-123456",
    // },
  ];

  const listSelectTruck = [{ value: "JBXY57", label: "JBXY57" }];

  // Función que devuelve una promesa con el nuevo ID
  const buscarUltimoId = async () => {
    const res = await axios.get(`${API_URL}/viajes`);
    const viajes = res.data;

    let ultimoId = 0;
    if (viajes.length > 0) {
      const numeros = viajes.map((v) => parseInt(v.id.split("-")[1], 10));
      ultimoId = Math.max(...numeros);
    }

    const nuevoId = `viaje-${String(ultimoId + 1).padStart(3, "0")}`;
    return nuevoId;
  };

  const saveData = async (values) => {
    try {
      // Validar que haya al menos un conductor
      if (!listaConductores || listaConductores.length === 0) {
        message.error("Debe añadir al menos un conductor antes de guardar");
        return;
      }

      // Fecha actual en formato dd-mm-aaaa
      const fechaHoy = new Date().toISOString().split("T")[0];

      const fechaVenceCamion = values.venceCamion
        ? new Date(values.venceCamion).toISOString().split("T")[0]
        : "";

      console.log("fecha cenve, ", values.venceCamion);
      // Si es crear → buscar nuevo ID
      let idFinal = datosViaje ? datosViaje.id : await buscarUltimoId();

      // Construcción base del objeto de datos
      let datosViajeNuevo = {
        id: idFinal,
        origen: values.origen,
        destino: values.destino,
        placa: values.placa,
        fechaViaje: datosViaje ? values.fechaViaje : fechaHoy,
        horaViaje: values.horaViaje,

        resolucionChilena: values.resolucionChilena,
        venceCamion: fechaVenceCamion,
        modeloCamion: values.modeloCamion,
        anioCamion: values.anioCamion,
        polizaCamion: values.polizaCamion,
        vtoCamion: values.vtoCamion,
        chasisCamion: values.chasisCamion,
        motorCamion: values.motorCamion,
      };

      // 🔹 Añadir los conductores de forma dinámica (licencia1, nombresConductor1, etc.)
      listaConductores.forEach((conductor, index) => {
        const num = index + 1;
        datosViajeNuevo[`licencia${num}`] = conductor.license;
        datosViajeNuevo[`nombresConductor${num}`] = conductor.nombres;
        datosViajeNuevo[`apellidosConductor${num}`] = conductor.apellidos;
      });

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

  const handleLicenseChange = (e) => {
    const ci = e.target.value;
    const datos = listaDatos.find((item) => item.license === ci);

    if (datos) {
      form.setFieldsValue({
        namesDriver: datos.nombres,
        lastNameDriver: datos.apellidos,
      });
    } else {
      form.setFieldsValue({
        namesDriver: "",
        lastNameDriver: "",
      });
    }
  };

  const searchPlateTruck = (e) => {
    const data = listTrucks.find((item) => item.placa === e);
    if (data) {
      form.setFieldsValue({
        modeloCamion: data.modelo,
        polizaCamion: data.polizaSeguro,
        resolucionChilena: data.resolucionChilena,
        vtoCamion: data.VTO,
        venceCamion: data.vence,
        chasisCamion: data.chasis,
        motorCamion: data.motor,
        anioCamion: data.anio,
      });
    } else {
      form.setFieldsValue({
        modeloCamion: "",
        polizaCamion: "",
        resolucionChilena: "",
        vtoCamion: "",
        venceCamion: "",
        chasisCamion: "",
        motorCamion: "",
        anioCamion: "",
      });
    }
  };

  const viewFormCustomer = () => {
    setViewModalPassengers(true);
  };

  const closeModal = () => {
    setViewModalPassengers(false);
  };

  const showCloseConfirm = () => {
    closeModal();
    form2.resetFields();
    form2.setFieldsValue({ sexo: 1 });
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const guardarDatosPasajeros = (date) => {
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
    navigate("/inicio");
  };

  // const imprimirDocumento = async () => {
  //   try {
  //     // Hacer copias de los datos actuales para asegurar que estén completos
  //     const datosActuales = JSON.parse(JSON.stringify(data));
  //     const pasajerosActuales = JSON.parse(JSON.stringify(listPasajeros));

  //     // Crear instancia del PDF
  //     const pdfInstance = pdf(
  //       <ConvertirPDF data={datosActuales} dataPasajeros={pasajerosActuales} />
  //     );

  //     // Generar el blob del PDF
  //     const blob = await pdfInstance.toBlob();
  //     const blobUrl = URL.createObjectURL(blob);

  //     // Abrir nueva ventana para imprimir
  //     const printWindow = window.open(blobUrl, "_blank");

  //     if (!printWindow) {
  //       alert("Por favor, permite ventanas emergentes para imprimir el PDF.");
  //       return;
  //     }

  //     // Cuando la ventana cargue, abrir el diálogo de impresión
  //     printWindow.onload = () => {
  //       printWindow.focus();
  //       printWindow.print();
  //     };
  //   } catch (error) {
  //     console.error("Error generando o imprimiendo el PDF:", error);
  //   }
  // };

  const mostrarErrorFormBus = () => {
    message.warning("Faltan llenar campos obligatorios");
  };

  const handleAddConductor = () => {
    const { license, namesDriver, lastNameDriver } = form.getFieldsValue([
      "license",
      "namesDriver",
      "lastNameDriver",
    ]);

    if (!license || !namesDriver || !lastNameDriver) {
      message.error(
        "Debe completar todos los campos del conductor antes de añadir"
      );
      return;
    }

    if (listaConductores.some((c) => c.license === license)) {
      message.error("Este conductor ya fue añadido");
      return;
    }

    if (listaConductores.length >= 4) {
      message.warning("Solo se pueden añadir hasta 4 conductores");
      return;
    }

    const nuevoConductor = {
      license,
      nombres: namesDriver,
      apellidos: lastNameDriver,
    };

    setListaConductores([...listaConductores, nuevoConductor]);
    console.log("los conductores son, ", listaConductores);
    form.resetFields(["license", "namesDriver", "lastNameDriver"]);
  };

  //handleDeleteDrivers
  const handleDeleteDrivers = (license) => {
    const nuevaLista = listaConductores.filter((c) => c.license !== license);
    setListaConductores(nuevaLista);
  };

  return (
    <div className="contenedor-principal-cliente">
      <Button className="cliente-button-back" onClick={viewHome} type="primary">
        <RollbackOutlined />
        <span className="cliente-button-text">Atrás</span>
      </Button>
      <h2>Formulario de viaje</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={saveData}
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
                options={origins}
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
                options={destination}
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
        <div className="group-input-list-drives">
          <div className="inputs-drivers">
            <Form.Item
              label="Licencia"
              name="license"
              rules={[
                {
                  pattern: /^[0-9]{1,9}$/,
                  message: "Solo números, máximo 9 dígitos",
                },
              ]}
            >
              <Input
                placeholder="Ingrese la licencia"
                maxLength={9}
                onChange={handleLicenseChange}
              />
            </Form.Item>

            <Form.Item label="Nombres" name="namesDriver">
              <Input placeholder="Ingrese los nombres" maxLength={18} />
            </Form.Item>

            <Form.Item label="Apellidos" name="lastNameDriver">
              <Input placeholder="Ingrese los apellidos" maxLength={18} />
            </Form.Item>

            <Button
              type="primary"
              onClick={handleAddConductor}
              disabled={listaConductores.length >= 4}
            >
              Añadir
            </Button>
          </div>
          <div className="list-drivers">
            <List
              header={<b>Conductores añadidos</b>}
              bordered
              dataSource={listaConductores}
              renderItem={(item, index) => (
                <List.Item
                  key={index}
                  actions={[
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => handleDeleteDrivers(item.license)}
                    />,
                  ]}
                >
                  <b>Conductor {index + 1}:</b> {item.nombres} {item.apellidos}{" "}
                  - Licencia: {item.license}
                </List.Item>
              )}
            />
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
                onChange={searchPlateTruck}
                allowClear
                placeholder="Seleccione la placa"
                options={listSelectTruck}
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
        open={viewModalPassengers}
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
