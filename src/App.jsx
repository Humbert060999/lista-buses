import "./App.css";
import React, { useState } from "react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import ConvertirPDF from "./ConvertirPDF";
import { Input, Form, DatePicker, TimePicker, Button } from "antd";
import moment from "moment";

function App() {
  const [showDownloadLink, setShowDownloadLink] = useState(false);
  const [data, setData] = useState([]);
  const [form] = Form.useForm();

  const registrarDatos = (values) => {
    console.log("Datos del formulario:", values);

    const fecha = values.fechaViaje;
    const hora = values.horaViaje;

    if (!fecha || !hora) {
      console.error("Fecha o hora no seleccionadas correctamente.");
      return;
    }

    let nuevaFechaViaje;
    let nuevaHoraViaje;

    try {
      nuevaFechaViaje = fecha.format("DD-MM-YYYY");
      nuevaHoraViaje = hora.format("HH:mm");
    } catch (error) {
      console.error("Error al formatear la fecha o la hora:", error);
      return;
    }
    const conductor1 =
      values.nombresConductor1 + " " + values.apellidosConductor1;
    const conductor2 =
      values.nombresConductor2 + " " + values.apellidosConductor2;

    const datos = {
      origen: values.origen,
      destino: values.destino,
      placa: values.placa,
      fechaViaje: nuevaFechaViaje,
      horaViaje: nuevaHoraViaje,
      conductor1: conductor1,
      conductor2: conductor2,
      licencia1: values.licencia1,
      licencia2: values.licencia2,
    };
    setShowDownloadLink(true);
    setData(datos);
    console.log("Datos completos:", datos);

    // Aquí puedes agregar la lógica para manejar el objeto datos, como enviarlo a una API
  };

  return (
    <div className="contenedor-principal">
      <h1>Generar Documento PDF</h1>
      <Form form={form} layout="vertical" onFinish={registrarDatos}>
        <Form.Item label="Origen" name="origen">
          <Input />
        </Form.Item>
        <Form.Item label="Destino" name="destino">
          <Input />
        </Form.Item>
        <Form.Item label="Placa o Patente N°" name="placa">
          <Input />
        </Form.Item>
        <Form.Item label="Fecha de  viaje" name="fechaViaje">
          <DatePicker />
        </Form.Item>
        <Form.Item label="Hora de salida" name="horaViaje">
          <TimePicker />
        </Form.Item>
        <Form.Item label="Nombres del conductor 1" name="nombresConductor1">
          <Input />
        </Form.Item>
        <Form.Item label="Apellidos del conductor 1" name="apellidosConductor1">
          <Input />
        </Form.Item>
        <Form.Item label="Licencia conductor 1" name="licencia1">
          <Input />
        </Form.Item>
        <Form.Item label="Nombres del conductor 2" name="nombresConductor2">
          <Input />
        </Form.Item>
        <Form.Item label="Apellidos del conductor 2" name="apellidosConductor2">
          <Input />
        </Form.Item>
        <Form.Item label="Licencia conductor 2" name="licencia2">
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Enviar
        </Button>
      </Form>
      {/* <PDFViewer style={{ marginLeft: 100 }} width="1000" height="700">
        <ConvertirPDF data={data} />
      </PDFViewer> */}

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

export default App;
