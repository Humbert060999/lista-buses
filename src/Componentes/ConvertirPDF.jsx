import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import LogoBus from "../Imagenes/logo-bus.png";
import LogoLetras from "../Imagenes/logo-titulo.png";

// Definir estilos
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 20,
    fontSize: 10,
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
    marginTop: 10,
  },
  value: {
    flex: 1,
  },
  espacioTexto: {
    marginLeft: 5,
  },
  espacioLabel: {
    marginLeft: 20,
    fontWeight: "bold",
  },
  espacioHora: {
    marginLeft: "10%",
  },
  dosColumnas: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    marginTop: 10,
  },
});

export default function ConvertirPDF({ data }) {
  return (
    <Document>
      <Page size="Legal" style={styles.page}>
        <View style={styles.header}>
          <Image style={{ height: 100, marginRight: 80 }} src={LogoLetras} />
          <Image style={{ height: 90 }} src={LogoBus} />
        </View>

        {/* Campos de texto */}
        <View>
          <Text style={styles.fechaViaje}>Fecha de viaje:</Text>
          <Text style={{ marginLeft: 505, marginTop: -10 }}>
            {data.fechaViaje}
          </Text>
        </View>
        <View style={styles.fila1}>
          <Text style={{ fontWeight: "bold" }}>Origen:</Text>
          <Text style={styles.espacioTexto}>{data.origen}</Text>

          <Text style={styles.espacioLabel}>Destino:</Text>
          <Text style={styles.espacioTexto}>{data.destino}</Text>

          <Text style={styles.espacioLabel}>Placa o Patente N°:</Text>
          <Text style={styles.espacioTexto}>{data.placa}</Text>

          <Text style={styles.espacioHora}>Hora de salida:</Text>
          <Text style={styles.espacioTexto}>{data.horaViaje}</Text>
        </View>
        <View style={styles.dosColumnas}>
          <Text>Conductor 1:</Text>
          <Text style={styles.espacioTexto}>{data.conductor1}</Text>

          <Text style={{ marginLeft: 10 }}>Licencia:</Text>
          <Text style={styles.espacioTexto}>{data.licencia1}</Text>
        </View>
        <View style={styles.dosColumnas}>
          <Text>Conductor 2:</Text>
          <Text style={styles.espacioTexto}>{data.conductor2}</Text>

          <Text style={{ marginLeft: 10 }}>Licencia:</Text>
          <Text style={styles.espacioTexto}>{data.licencia2}</Text>
        </View>
        <View style={styles.dosColumnas}>
          <Text>Resolucion Chilena Excenta N°:</Text>
          <Text>{data.resolucionChilena}</Text>

          <Text>Vence:</Text>
          <Text>{data.vencimientoResolucion}</Text>

          <Text>Modelo:</Text>
          <Text>{data.modelo}</Text>

          <Text>Año:</Text>
          <Text>{data.anio}</Text>
        </View>
      </Page>
    </Document>
  );
}
