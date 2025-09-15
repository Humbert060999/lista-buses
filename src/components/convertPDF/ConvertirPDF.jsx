import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import LogoBus from "../../assets/logo-bus.png";
import LogoLetras from "../../assets/logo-titulo.png";
import MarcaAgua from "../../assets/logo-titulo.png";
// import otro from "../../../public/Fonts/";

// Registrar fuentes Roboto (Regular + Bold)
Font.register({
  family: "Roboto",
  fonts: [
    { src: "/Fonts/Roboto-Regular.ttf", fontWeight: "normal" },
    { src: "/Fonts/Roboto-Bold.ttf", fontWeight: "bold" },
  ],
});

// Estilos
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    paddingTop: -5,
    padding: 30,
    fontSize: 10,
    fontFamily: "Roboto",
  },
  boldText: {
    fontFamily: "Roboto",
    fontWeight: "bold",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  fechaViaje: {
    marginLeft: 430,
  },
  fila1: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    marginTop: 5,
  },
  espacioTexto: {
    marginLeft: 5,
  },
  espacioLabel: {
    marginLeft: 20,
  },
  espacioHora: {
    marginLeft: "10%",
  },
  odenadoFila: {
    display: "flex",
    flexDirection: "row",
    marginTop: 5,
  },
  gridConductores: {
    flexDirection: "column",
    gap: 6,
    marginTop: 5,
  },
  rowConductor: {
    flexDirection: "row",
  },
  colConductorNombre: {
    width: "47.5%",
  },
  ultimaFila: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 10,
  },
  table: {
    width: "100%",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    borderTop: "1px solid #7e7e7e",
    paddingTop: 1.2,
    paddingBottom: 1.2,
    fontSize: 8,
  },
  bold: {
    fontWeight: "bold",
  },
  col1: { width: "3%" },
  col2: { width: "16%" },
  col3: { width: "18%" },
  col4: { width: "9%" },
  col5: { width: "11%" },
  col6: { width: "12%" },
  col7: { width: "12%" },
  col8: { width: "8%", textAlign: "center" },
  col9: { width: "15%" },

  watermarkContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
    flexDirection: "row",
    flexWrap: "wrap",
    opacity: 0.08, // transparencia suave
  },

  watermarkImage: {
    width: 100, // más pequeño
    height: 80,
    margin: 10, // separación entre cada marca
    transform: "rotate(-45deg)", // inclinado
  },
});

export default function ConvertirPDF({ data, dataPasajeros }) {
  // lista de pasajeros
  const listPasajeros = (dataPasajeros || [])
    .filter((p) => p.nroAsiento)
    .sort((a, b) => a.nroAsiento - b.nroAsiento)
    .map((pasajero) => ({
      number: pasajero.nroAsiento,
      nombre: pasajero.nombre,
      apellido: pasajero.apellido,
      nac: pasajero.nacionalidadPasajero,
      ci: pasajero.ci,
      fechaNac: pasajero.fechaNacimiento,
      origen: data?.origen || "",
      sexo: pasajero.sexo === 1 ? "M" : "F",
      destino: pasajero.destinoPasajero || "",
    }));

  return (
    <Document>
      <Page size={{ width: 612, height: 1008 }} style={styles.page}>
        {/* Marca de agua */}
        <View style={styles.watermarkContainer}>
          {Array.from({ length: 50 }).map((_, i) => (
            <Image key={i} src={MarcaAgua} style={styles.watermarkImage} />
          ))}
        </View>

        {/* Header */}
        <View style={styles.header}>
          <Image style={{ height: 90, marginRight: 140 }} src={LogoLetras} />
          <Image style={{ height: 90 }} src={LogoBus} />
        </View>

        {/* Fecha de viaje */}
        <View style={styles.formulario}>
          <Text style={[styles.fechaViaje]}>
            <Text style={styles.boldText}>Fecha de viaje: </Text>
            <Text>{data.fechaViaje}</Text>
          </Text>
        </View>

        {/* Fila Origen - Destino - Placa - Hora */}
        <View style={styles.fila1}>
          <Text>
            <Text style={styles.boldText}>Origen: </Text>
            <Text>{data.origen}</Text>
          </Text>

          <Text style={styles.espacioLabel}>
            <Text style={styles.boldText}>Destino: </Text>
            <Text>{data.destino}</Text>
          </Text>

          <Text style={[styles.espacioLabel, { marginLeft: "50px" }]}>
            <Text style={styles.boldText}>Placa o Patente N°: </Text>
            <Text>{data.placa}</Text>
          </Text>

          <Text style={styles.espacioHora}>
            <Text style={styles.boldText}>Hora de salida: </Text>
            <Text>{data.horaViaje}</Text>
          </Text>
        </View>

        {/* Conductores */}
        <View style={styles.gridConductores}>
          {[
            {
              label: "Conductor 1",
              nombre: `${data.nombresConductor1 || ""} ${
                data.apellidosConductor1 || ""
              }`,
              licencia: data.licencia1,
            },
            {
              label: "Conductor 2",
              nombre: `${data.nombresConductor2 || ""} ${
                data.apellidosConductor2 || ""
              }`,
              licencia: data.licencia2,
            },
            {
              label: "Conductor 3",
              nombre: `${data.nombresConductor3 || ""} ${
                data.apellidosConductor3 || ""
              }`,
              licencia: data.licencia3,
            },
            {
              label: "Conductor 4",
              nombre: `${data.nombresConductor4 || ""} ${
                data.apellidosConductor4 || ""
              }`,
              licencia: data.licencia4,
            },
          ]
            .filter((item) => item.nombre.trim() !== "" && item.licencia)
            .map((item, index) => (
              <View key={index} style={styles.rowConductor}>
                <Text style={styles.colConductorNombre}>
                  <Text style={styles.boldText}>{item.label}: </Text>
                  <Text>{item.nombre}</Text>
                </Text>
                <Text>
                  <Text style={styles.boldText}>Licencia: </Text>
                  <Text>{item.licencia}</Text>
                </Text>
              </View>
            ))}
        </View>

        {/* Datos Camión */}
        <View style={styles.odenadoFila}>
          <Text>
            <Text style={styles.boldText}>Resolución Chilena Excenta N°: </Text>
            <Text>{data.resolucionChilena}</Text>
          </Text>

          <Text style={{ marginLeft: 50 }}>
            <Text style={styles.boldText}>Vence: </Text>
            <Text>{data.venceCamion}</Text>
          </Text>

          <Text style={{ marginLeft: 10 }}>
            <Text style={styles.boldText}>Modelo: </Text>
            <Text>{data.modeloCamion}</Text>
          </Text>

          <Text style={{ marginLeft: 10 }}>
            <Text style={styles.boldText}>Año: </Text>
            <Text>{data.anioCamion}</Text>
          </Text>
        </View>

        <View style={styles.ultimaFila}>
          <Text>
            <Text style={styles.boldText}>Póliza de seguro: </Text>
            <Text>{data.polizaCamion}</Text>
          </Text>
          <Text style={{ marginLeft: 10 }}>
            <Text style={styles.boldText}>Vence: </Text>
            <Text>{data.vtoCamion}</Text>
          </Text>
          <Text style={{ marginLeft: 10 }}>
            <Text style={styles.boldText}>Chasis: </Text>
            <Text>{data.chasisCamion}</Text>
          </Text>
          <Text style={{ marginLeft: 10 }}>
            <Text style={styles.boldText}>Motor: </Text>
            <Text>{data.motorCamion}</Text>
          </Text>
        </View>

        {/* Tabla Pasajeros */}
        <View style={styles.table}>
          <View style={[styles.row, styles.bold, styles.header]}>
            <Text style={styles.col1}>N°</Text>
            <Text style={styles.col2}>NOMBRES</Text>
            <Text style={styles.col3}>APELLIDOS</Text>
            <Text style={styles.col4}>NAC</Text>
            <Text style={styles.col5}>CI</Text>
            <Text style={styles.col6}>FECHA NAC</Text>
            <Text style={styles.col7}>ORIGEN</Text>
            <Text style={styles.col8}>SEXO</Text>
            <Text style={styles.col9}>DESTINO</Text>
          </View>
          {listPasajeros.map((row, i) => (
            <View key={i} style={styles.row} wrap={false}>
              <Text style={styles.col1}>{row.number}</Text>
              <Text style={styles.col2}>{row.nombre}</Text>
              <Text style={styles.col3}>{row.apellido}</Text>
              <Text style={styles.col4}>{row.nac}</Text>
              <Text style={styles.col5}>{row.ci}</Text>
              <Text style={styles.col6}>{row.fechaNac}</Text>
              <Text style={styles.col7}>{row.origen}</Text>
              <Text style={styles.col8}>{row.sexo}</Text>
              <Text style={styles.col9}>{row.destino}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
