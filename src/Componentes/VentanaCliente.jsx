import "./VentanaCliente.css";
import React, { useEffect, useState } from "react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import ConvertirPDF from "./ConvertirPDF";
import { Input, Form, Button, Select } from "antd";

export default function VentanaCliente() {
  const [showDownloadLink, setShowDownloadLink] = useState(false);
  const [data, setData] = useState([]);
  const [form] = Form.useForm();
  const [licencia, setLicencia] = useState("");

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

  useEffect(() => {
    // console.log("Si llega a la ventana");
  }, []);

  const registrarDatos = (values) => {
    console.log("Datos del formulario:", values);

    const fechaOriginal = values.fechaViaje;
    const fechaVenceCamion = values.venceCamion;

    const partesFecha = fechaOriginal.split("-");
    const partesFecha2 = fechaVenceCamion.split("-");

    // Reorganizar las partes a [dd, mm, aaaa]
    const fechaViajeFormateada = `${partesFecha[2]}-${partesFecha[1]}-${partesFecha[0]}`;
    const fechaVenceCamionFormateada = `${partesFecha2[2]}-${partesFecha2[1]}-${partesFecha2[0]}`;

    const conductor1 =
      values.nombresConductor1 + " " + values.apellidosConductor1;
    const conductor2 =
      values.nombresConductor2 + " " + values.apellidosConductor2;

    const datos = {
      origen: values.origen,
      destino: values.destino,
      placa: values.placa,
      fechaViaje: fechaViajeFormateada,
      horaViaje: values.horaViaje,
      conductor1: conductor1,
      conductor2: conductor2,
      licencia1: values.licencia1,
      licencia2: values.licencia2,
      resolucionChilena: values.resolucionChilena,
      venceCamion: fechaVenceCamionFormateada,
      modeloCamion: values.modeloCamion,
      anioCamion: values.anioCamion,
      polizaSeguro: values.polizaCamion,
      vtoCamion: values.vtoCamion,
      chasisCamion: values.chasisCamion,
      motorCamion: values.motorCamion,
    };
    setShowDownloadLink(true);
    setData(datos);
    console.log("Datos completos:", datos);
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

  return (
    <div className="contenedor-principal-cliente">
      <h2>Formulario de viaje</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={registrarDatos}
        className="formulario-cliente"
      >
        <div class="linea-con-texto">
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
                { required: true, message: "Por favor, seleccione el origen" },
              ]}
            >
              <Select
                showSearch
                placeholder="Seleccione el origen"
                optionFilterProp="label"
                options={origenes}
                notFoundContent="No se encontró el origen "
              />
            </Form.Item>
            <Form.Item
              label="Destino"
              name="destino"
              rules={[
                { required: true, message: "Por favor, seleccione el destino" },
              ]}
            >
              <Select
                showSearch
                placeholder="Seleccione el destino"
                optionFilterProp="label"
                options={destinos}
                notFoundContent="No se encontró el origen "
              />
            </Form.Item>
          </div>
          <div className="datos-viaje-dos">
            <Form.Item
              label="Fecha de viaje"
              name="fechaViaje"
              rules={[
                {
                  required: true,
                  message: "Por favor, seleccione la fecha de viaje",
                },
              ]}
            >
              <input
                type="date"
                id="fecha"
                placeholder="Seleccione la fecha de viaje"
                className="input-estilo"
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
              ]}
            >
              <Input
                value={licencia}
                onChange={handleLicenciaChange1}
                placeholder="Ingrese el número de licencia"
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
                  message: "Por favor, ingrese los apellidos del conductor 1",
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
              ]}
            >
              <Input
                value={licencia}
                onChange={handleLicenciaChange2}
                placeholder="Ingrese el número de licencia"
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
                  message: "Por favor, ingrese los apellidos del conductor 2",
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
          </div>
        </div>

        <Button type="primary" htmlType="submit">
          Enviar
        </Button>
      </Form>
      <PDFViewer style={{ marginLeft: 100 }} width="1000" height="700">
        <ConvertirPDF data={data} />
      </PDFViewer>

      {showDownloadLink && (
        <div>
          <PDFDownloadLink
            document={<ConvertirPDF data={data} />}
            fileName="document.pdf"
          >
            {({ blob, url, loading, error }) =>
              loading ? "Cargando documento..." : "Descargar PDF"
            }
          </PDFDownloadLink>
        </div>
      )}
    </div>
  );
}
