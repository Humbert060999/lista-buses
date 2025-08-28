import React, { useEffect, useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import LogoBus from "../../assets/logo-bus.png";
import LogoLetras from "../../assets/logo-titulo.png";

// Definir estilos
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    paddingTop: -5,
    padding: 30,
    fontSize: 10,
  },
  boldText: {
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
    flexWrap: "wrap",
    flexDirection: "row",
    marginTop: 5,
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
  // Columnas con ancho especificado
  col1: { width: "3%" }, // N°
  col2: { width: "18%" }, // Nombres
  col3: { width: "18%" }, // Apellidos
  col4: { width: "9%" }, // NAC
  col5: { width: "9%" }, // CI
  col6: { width: "12%" }, // Fecha NAC
  col7: { width: "12%" }, // Origen
  col8: { width: "8%", textAlign: "center" }, // Sexo
  col9: { width: "15%" }, // Destino
});

export default function ConvertirPDF({ data, dataPasajeros }) {
  // Generar lista de pasajeros directamente
  const listPasajeros = (dataPasajeros || []).map((pasajero, i) => ({
    number: i + 1,
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
      <Page size="Legal" style={styles.page}>
        <View style={styles.header}>
          <Image style={{ height: 100, marginRight: 80 }} src={LogoLetras} />
          <Image style={{ height: 90 }} src={LogoBus} />
        </View>

        {/* Campos de texto */}
        <View style={styles.formulario}>
          <Text style={styles.fechaViaje}>Fecha de viaje:</Text>
          <Text style={{ marginLeft: 505, marginTop: -10 }}>
            {data.fechaViaje}
          </Text>
        </View>
        <View style={styles.fila1}>
          <Text>Origen:</Text>

          <Text style={styles.espacioTexto}>{data.origen}</Text>

          <Text style={styles.espacioLabel}>Destino:</Text>
          <Text style={styles.espacioTexto}>{data.destino}</Text>

          <Text style={[styles.espacioLabel, { marginLeft: "50px" }]}>
            Placa o Patente N°:
          </Text>
          <Text style={styles.espacioTexto}>{data.placa}</Text>

          <Text style={styles.espacioHora}>Hora de salida:</Text>
          <Text style={styles.espacioTexto}>{data.horaViaje}</Text>
        </View>
        <View style={styles.odenadoFila}>
          <Text>Conductor 1:</Text>
          <Text style={styles.espacioTexto}>
            {`${data.nombresConductor1 || ""} ${data.apellidosConductor1 || ""}`}
          </Text>

          <Text style={{ marginLeft: 10 }}>Licencia:</Text>
          <Text style={styles.espacioTexto}>{data.licencia1}</Text>
        </View>

        <View style={[styles.odenadoFila, styles.formulario]}>
          <Text>Conductor 2:</Text>
          <Text style={styles.espacioTexto}>
            {`${data.nombresConductor2 || ""} ${data.apellidosConductor2 || ""}`}
          </Text>

          <Text style={{ marginLeft: 10 }}>Licencia:</Text>
          <Text style={styles.espacioTexto}>{data.licencia2}</Text>
        </View>

        <View style={styles.odenadoFila}>
          <Text>Resolucion Chilena Excenta N°:</Text>
          <Text style={styles.espacioTexto}>{data.resolucionChilena}</Text>

          <Text style={{ marginLeft: 50 }}>Vence:</Text>
          <Text style={styles.espacioTexto}>{data.venceCamion}</Text>

          <Text style={{ marginLeft: 10 }}>Modelo:</Text>
          <Text style={styles.espacioTexto}>{data.modeloCamion}</Text>

          <Text style={{ marginLeft: 10 }}>Año:</Text>
          <Text style={styles.espacioTexto}>{data.anioCamion}</Text>
        </View>
        <View style={styles.ultimaFila}>
          <Text>Póliza de seguro:</Text>
          <Text style={styles.espacioTexto}>{data.polizaSeguro}</Text>
          <Text style={{ marginLeft: 10 }}>VTO:</Text>
          <Text style={styles.espacioTexto}>{data.vtoCamion}</Text>
          <Text style={{ marginLeft: 10 }}>Chasis:</Text>
          <Text style={styles.espacioTexto}>{data.chasisCamion}</Text>
          <Text style={{ marginLeft: 10 }}>Motor:</Text>
          <Text style={styles.espacioTexto}>{data.motorCamion}</Text>
        </View>

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
