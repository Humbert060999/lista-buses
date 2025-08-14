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
  col1: {
    width: "5%",
  },
  col2: {
    width: "22%",
  },
  col3: {
    width: "20%",
  },
  col4: {
    width: "10%",
  },
  col5: {
    width: "12%",
  },
  col6: {
    width: "15%",
  },
  col7: {
    width: "15%",
  },
  col8: {
    width: "10%",
  },
  col9: {
    width: "10%",
  },
});

// const exampleData = [
//   {
//     number: 1, // N°
//     nombre: "HUMBERTO HUMBERTO", // NOMBRE
//     apellido: "LUCANA MAMANI", // APELLIDO
//     nac: "CBBA", // NAC
//     ci: "12714653", // CI
//     fechaNac: "06-09-1999", // FECHA NAC
//     origen: "CBBA", // ORIGEN
//     sexo: "M", // SEXO
//     destino: "IQUIQUE", // DESTINO
//   },
//   {
//     number: 2, // N°
//     nombre: "Ana", // NOMBRE
//     apellido: "García", // APELLIDO
//     nac: "ES", // NAC
//     ci: "87654321", // CI
//     fechaNac: "1985-10-22", // FECHA NAC
//     origen: "Barcelona", // ORIGEN
//     sexo: "F", // SEXO
//     destino: "Roma", // DESTINO
//   },
//   {
//     number: 3, // N°
//     nombre: "Carlos", // NOMBRE
//     apellido: "Sánchez", // APELLIDO
//     nac: "MX", // NAC
//     ci: "23456789", // CI
//     fechaNac: "1978-03-30", // FECHA NAC
//     origen: "México", // ORIGEN
//     sexo: "M", // SEXO
//     destino: "Londres", // DESTINO
//   },
//   {
//     number: 4, // N°
//     nombre: "María", // NOMBRE
//     apellido: "Lopez", // APELLIDO
//     nac: "US", // NAC
//     ci: "34567890", // CI
//     fechaNac: "1992-07-18", // FECHA NAC
//     origen: "Los Ángeles", // ORIGEN
//     sexo: "F", // SEXO
//     destino: "Nueva ", // DESTINO
//   },
//   {
//     number: 5, // N°
//     nombre: "María", // NOMBRE
//     apellido: "Lopez", // APELLIDO
//     nac: "US", // NAC
//     ci: "34567890", // CI
//     fechaNac: "1992-07-18", // FECHA NAC
//     origen: "Los Ángeles", // ORIGEN
//     sexo: "F", // SEXO
//     destino: "Nueva ", // DESTINO
//   },
//   {
//     number: 6, // N°
//     nombre: "María", // NOMBRE
//     apellido: "Lopez", // APELLIDO
//     nac: "US", // NAC
//     ci: "34567890", // CI
//     fechaNac: "1992-07-18", // FECHA NAC
//     origen: "Los Ángeles", // ORIGEN
//     sexo: "F", // SEXO
//     destino: "Nueva ", // DESTINO
//   },
//   {
//     number: 7, // N°
//     nombre: "María", // NOMBRE
//     apellido: "Lopez", // APELLIDO
//     nac: "US", // NAC
//     ci: "34567890", // CI
//     fechaNac: "1992-07-18", // FECHA NAC
//     origen: "Los Ángeles", // ORIGEN
//     sexo: "F", // SEXO
//     destino: "Nueva", // DESTINO
//   },
//   {
//     number: 8, // N°
//     nombre: "María", // NOMBRE
//     apellido: "Lopez", // APELLIDO
//     nac: "US", // NAC
//     ci: "34567890", // CI
//     fechaNac: "1992-07-18", // FECHA NAC
//     origen: "Los Ángeles", // ORIGEN
//     sexo: "F", // SEXO
//     destino: "Nueva", // DESTINO
//   },
//   {
//     number: 9, // N°
//     nombre: "María", // NOMBRE
//     apellido: "Lopez", // APELLIDO
//     nac: "US", // NAC
//     ci: "34567890", // CI
//     fechaNac: "1992-07-18", // FECHA NAC
//     origen: "Los Ángeles", // ORIGEN
//     sexo: "F", // SEXO
//     destino: "Nueva ", // DESTINO
//   },
//   {
//     number: 10, // N°
//     nombre: "María", // NOMBRE
//     apellido: "Lopez", // APELLIDO
//     nac: "US", // NAC
//     ci: "34567890", // CI
//     fechaNac: "1992-07-18", // FECHA NAC
//     origen: "Los Ángeles", // ORIGEN
//     sexo: "F", // SEXO
//     destino: "Nueva ", // DESTINO
//   },
//   {
//     number: 11, // N°
//     nombre: "María", // NOMBRE
//     apellido: "Lopez", // APELLIDO
//     nac: "US", // NAC
//     ci: "34567890", // CI
//     fechaNac: "1992-07-18", // FECHA NAC
//     origen: "Los Ángeles", // ORIGEN
//     sexo: "F", // SEXO
//     destino: "Nueva ", // DESTINO
//   },
//   {
//     number: 13, // N°
//     nombre: "María", // NOMBRE
//     apellido: "Lopez", // APELLIDO
//     nac: "US", // NAC
//     ci: "34567890", // CI
//     fechaNac: "1992-07-18", // FECHA NAC
//     origen: "Los Ángeles", // ORIGEN
//     sexo: "F", // SEXO
//     destino: "Nueva ", // DESTINO
//   },
//   {
//     number: 14, // N°
//     nombre: "María", // NOMBRE
//     apellido: "Lopez", // APELLIDO
//     nac: "US", // NAC
//     ci: "34567890", // CI
//     fechaNac: "1992-07-18", // FECHA NAC
//     origen: "Los Ángeles", // ORIGEN
//     sexo: "F", // SEXO
//     destino: "Nueva ", // DESTINO
//   },
//   {
//     number: 15, // N°
//     nombre: "María", // NOMBRE
//     apellido: "Lopez", // APELLIDO
//     nac: "US", // NAC
//     ci: "34567890", // CI
//     fechaNac: "1992-07-18", // FECHA NAC
//     origen: "Los Ángeles", // ORIGEN
//     sexo: "F", // SEXO
//     destino: "Nueva", // DESTINO
//   },
//   {
//     number: 16, // N°
//     nombre: "María", // NOMBRE
//     apellido: "Lopez", // APELLIDO
//     nac: "US", // NAC
//     ci: "34567890", // CI
//     fechaNac: "1992-07-18", // FECHA NAC
//     origen: "Los Ángeles", // ORIGEN
//     sexo: "F", // SEXO
//     destino: "Nueva", // DESTINO
//   },
//   {
//     number: 17, // N°
//     nombre: "María", // NOMBRE
//     apellido: "Lopez", // APELLIDO
//     nac: "US", // NAC
//     ci: "34567890", // CI
//     fechaNac: "1992-07-18", // FECHA NAC
//     origen: "Los Ángeles", // ORIGEN
//     sexo: "F", // SEXO
//     destino: "Nueva", // DESTINO
//   },
//   {
//     number: 18, // N°
//     nombre: "María", // NOMBRE
//     apellido: "Lopez", // APELLIDO
//     nac: "US", // NAC
//     ci: "34567890", // CI
//     fechaNac: "1992-07-18", // FECHA NAC
//     origen: "Los Ángeles", // ORIGEN
//     sexo: "F", // SEXO
//     destino: "Nueva", // DESTINO
//   },
//   {
//     number: 19, // N°
//     nombre: "María", // NOMBRE
//     apellido: "Lopez", // APELLIDO
//     nac: "US", // NAC
//     ci: "34567890", // CI
//     fechaNac: "1992-07-18", // FECHA NAC
//     origen: "Los Ángeles", // ORIGEN
//     sexo: "F", // SEXO
//     destino: "Nueva", // DESTINO
//   },
//   {
//     number: 20, // N°
//     nombre: "María", // NOMBRE
//     apellido: "Lopez", // APELLIDO
//     nac: "US", // NAC
//     ci: "34567890", // CI
//     fechaNac: "1992-07-18", // FECHA NAC
//     origen: "Los Ángeles", // ORIGEN
//     sexo: "F", // SEXO
//     destino: "Nueva", // DESTINO
//   },
//   {
//     number: 21, // N°
//     nombre: "María", // NOMBRE
//     apellido: "Lopez", // APELLIDO
//     nac: "US", // NAC
//     ci: "34567890", // CI
//     fechaNac: "1992-07-18", // FECHA NAC
//     origen: "Los Ángeles", // ORIGEN
//     sexo: "F", // SEXO
//     destino: "Nueva", // DESTINO
//   },
//   {
//     number: 22, // N°
//     nombre: "María", // NOMBRE
//     apellido: "Lopez", // APELLIDO
//     nac: "US", // NAC
//     ci: "34567890", // CI
//     fechaNac: "1992-07-18", // FECHA NAC
//     origen: "Los Ángeles", // ORIGEN
//     sexo: "F", // SEXO
//     destino: "Nueva", // DESTINO
//   },
//   {
//     number: 23, // N°
//     nombre: "María", // NOMBRE
//     apellido: "Lopez", // APELLIDO
//     nac: "US", // NAC
//     ci: "34567890", // CI
//     fechaNac: "1992-07-18", // FECHA NAC
//     origen: "Los Ángeles", // ORIGEN
//     sexo: "F", // SEXO
//     destino: "Nueva", // DESTINO
//   },
//   {
//     number: 24, // N°
//     nombre: "María", // NOMBRE
//     apellido: "Lopez", // APELLIDO
//     nac: "US", // NAC
//     ci: "34567890", // CI
//     fechaNac: "1992-07-18", // FECHA NAC
//     origen: "Los Ángeles", // ORIGEN
//     sexo: "F", // SEXO
//     destino: "Nueva", // DESTINO
//   },
//   {
//     number: 25, // N°
//     nombre: "María", // NOMBRE
//     apellido: "Lopez", // APELLIDO
//     nac: "US", // NAC
//     ci: "34567890", // CI
//     fechaNac: "1992-07-18", // FECHA NAC
//     origen: "Los Ángeles", // ORIGEN
//     sexo: "F", // SEXO
//     destino: "Nueva", // DESTINO
//   },
//   {
//     number: 26, // N°
//     nombre: "María", // NOMBRE
//     apellido: "Lopez", // APELLIDO
//     nac: "US", // NAC
//     ci: "34567890", // CI
//     fechaNac: "1992-07-18", // FECHA NAC
//     origen: "Los Ángeles", // ORIGEN
//     sexo: "F", // SEXO
//     destino: "Nueva", // DESTINO
//   },
//   {
//     number: 27, // N°
//     nombre: "María", // NOMBRE
//     apellido: "Lopez", // APELLIDO
//     nac: "US", // NAC
//     ci: "34567890", // CI
//     fechaNac: "1992-07-18", // FECHA NAC
//     origen: "Los Ángeles", // ORIGEN
//     sexo: "F", // SEXO
//     destino: "Nueva", // DESTINO
//   },
//   {
//     number: 28, // N°
//     nombre: "María", // NOMBRE
//     apellido: "Lopez", // APELLIDO
//     nac: "US", // NAC
//     ci: "34567890", // CI
//     fechaNac: "1992-07-18", // FECHA NAC
//     origen: "Los Ángeles", // ORIGEN
//     sexo: "F", // SEXO
//     destino: "Nueva", // DESTINO
//   },
//   {
//     number: 29, // N°
//     nombre: "María", // NOMBRE
//     apellido: "Lopez", // APELLIDO
//     nac: "US", // NAC
//     ci: "34567890", // CI
//     fechaNac: "1992-07-18", // FECHA NAC
//     origen: "Los Ángeles", // ORIGEN
//     sexo: "F", // SEXO
//     destino: "Nueva", // DESTINO
//   },
//   {
//     number: 30, // N°
//     nombre: "María", // NOMBRE
//     apellido: "Lopez", // APELLIDO
//     nac: "US", // NAC
//     ci: "34567890", // CI
//     fechaNac: "1992-07-18", // FECHA NAC
//     origen: "Los Ángeles", // ORIGEN
//     sexo: "F", // SEXO
//     destino: "Nueva", // DESTINO
//   },
//   {
//     number: 31, // N°
//     nombre: "María", // NOMBRE
//     apellido: "Lopez", // APELLIDO
//     nac: "US", // NAC
//     ci: "34567890", // CI
//     fechaNac: "1992-07-18", // FECHA NAC
//     origen: "Los Ángeles", // ORIGEN
//     sexo: "F", // SEXO
//     destino: "Nueva", // DESTINO
//   },
//   {
//     number: 32, // N°
//     nombre: "María", // NOMBRE
//     apellido: "Lopez", // APELLIDO
//     nac: "US", // NAC
//     ci: "34567890", // CI
//     fechaNac: "1992-07-18", // FECHA NAC
//     origen: "Los Ángeles", // ORIGEN
//     sexo: "F", // SEXO
//     destino: "Nueva", // DESTINO
//   },
//   {
//     number: 33, // N°
//     nombre: "María", // NOMBRE
//     apellido: "Lopez", // APELLIDO
//     nac: "US", // NAC
//     ci: "34567890", // CI
//     fechaNac: "1992-07-18", // FECHA NAC
//     origen: "Los Ángeles", // ORIGEN
//     sexo: "F", // SEXO
//     destino: "Nueva", // DESTINO
//   },
//   {
//     number: 34, // N°
//     nombre: "María", // NOMBRE
//     apellido: "Lopez", // APELLIDO
//     nac: "US", // NAC
//     ci: "34567890", // CI
//     fechaNac: "1992-07-18", // FECHA NAC
//     origen: "Los Ángeles", // ORIGEN
//     sexo: "F", // SEXO
//     destino: "Nueva", // DESTINO
//   },
//   {
//     number: 35, // N°
//     nombre: "María", // NOMBRE
//     apellido: "Lopez", // APELLIDO
//     nac: "US", // NAC
//     ci: "34567890", // CI
//     fechaNac: "1992-07-18", // FECHA NAC
//     origen: "Los Ángeles", // ORIGEN
//     sexo: "F", // SEXO
//     destino: "Nueva", // DESTINO
//   },
//   {
//     number: 36, // N°
//     nombre: "María", // NOMBRE
//     apellido: "Lopez", // APELLIDO
//     nac: "US", // NAC
//     ci: "34567890", // CI
//     fechaNac: "1992-07-18", // FECHA NAC
//     origen: "Los Ángeles", // ORIGEN
//     sexo: "F", // SEXO
//     destino: "Nueva", // DESTINO
//   },
//   {
//     number: 37, // N°
//     nombre: "María", // NOMBRE
//     apellido: "Lopez", // APELLIDO
//     nac: "US", // NAC
//     ci: "34567890", // CI
//     fechaNac: "1992-07-18", // FECHA NAC
//     origen: "Los Ángeles", // ORIGEN
//     sexo: "F", // SEXO
//     destino: "Nueva", // DESTINO
//   },
//   {
//     number: 38, // N°
//     nombre: "María", // NOMBRE
//     apellido: "Lopez", // APELLIDO
//     nac: "US", // NAC
//     ci: "34567890", // CI
//     fechaNac: "1992-07-18", // FECHA NAC
//     origen: "Los Ángeles", // ORIGEN
//     sexo: "F", // SEXO
//     destino: "Nueva", // DESTINO
//   },
//   {
//     number: 39, // N°
//     nombre: "María", // NOMBRE
//     apellido: "Lopez", // APELLIDO
//     nac: "US", // NAC
//     ci: "34567890", // CI
//     fechaNac: "1992-07-18", // FECHA NAC
//     origen: "Los Ángeles", // ORIGEN
//     sexo: "F", // SEXO
//     destino: "Nueva", // DESTINO
//   },
//   {
//     number: 40, // N°
//     nombre: "María", // NOMBRE
//     apellido: "Lopez", // APELLIDO
//     nac: "US", // NAC
//     ci: "34567890", // CI
//     fechaNac: "1992-07-18", // FECHA NAC
//     origen: "Los Ángeles", // ORIGEN
//     sexo: "F", // SEXO
//     destino: "Nueva", // DESTINO
//   },
//   {
//     number: 41, // N°
//     nombre: "HUMBERTO HUMBERTO", // NOMBRE
//     apellido: "LUCANA MAMANI", // APELLIDO
//     nac: "CBBA", // NAC
//     ci: "12714653", // CI
//     fechaNac: "06-09-1999", // FECHA NAC
//     origen: "CBBA", // ORIGEN
//     sexo: "M", // SEXO
//     destino: "IQUIQUE", // DESTINO
//   },
//   {
//     number: 42, // N°
//     nombre: "HUMBERTO HUMBERTO", // NOMBRE
//     apellido: "LUCANA MAMANI", // APELLIDO
//     nac: "CBBA", // NAC
//     ci: "12714653", // CI
//     fechaNac: "06-09-1999", // FECHA NAC
//     origen: "CBBA", // ORIGEN
//     sexo: "M", // SEXO
//     destino: "IQUIQUE", // DESTINO
//   },
//   {
//     number: 43, // N°
//     nombre: "HUMBERTO HUMBERTO", // NOMBRE
//     apellido: "LUCANA MAMANI", // APELLIDO
//     nac: "CBBA", // NAC
//     ci: "12714653", // CI
//     fechaNac: "06-09-1999", // FECHA NAC
//     origen: "CBBA", // ORIGEN
//     sexo: "M", // SEXO
//     destino: "IQUIQUE", // DESTINO
//   },
//   {
//     number: 44, // N°
//     nombre: "HUMBERTO HUMBERTO", // NOMBRE
//     apellido: "LUCANA MAMANI", // APELLIDO
//     nac: "CBBA", // NAC
//     ci: "12714653", // CI
//     fechaNac: "06-09-1999", // FECHA NAC
//     origen: "CBBA", // ORIGEN
//     sexo: "M", // SEXO
//     destino: "IQUIQUE", // DESTINO
//   },
//   {
//     number: 45, // N°
//     nombre: "HUMBERTO HUMBERTO", // NOMBRE
//     apellido: "LUCANA MAMANI", // APELLIDO
//     nac: "CBBA", // NAC
//     ci: "12714653", // CI
//     fechaNac: "06-09-1999", // FECHA NAC
//     origen: "CBBA", // ORIGEN
//     sexo: "M", // SEXO
//     destino: "IQUIQUE", // DESTINO
//   },
//   {
//     number: 46, // N°
//     nombre: "HUMBERTO HUMBERTO", // NOMBRE
//     apellido: "LUCANA MAMANI", // APELLIDO
//     nac: "CBBA", // NAC
//     ci: "12714653", // CI
//     fechaNac: "06-09-1999", // FECHA NAC
//     origen: "CBBA", // ORIGEN
//     sexo: "M", // SEXO
//     destino: "IQUIQUE", // DESTINO
//   },
//   {
//     number: 47, // N°
//     nombre: "HUMBERTO HUMBERTO", // NOMBRE
//     apellido: "LUCANA MAMANI", // APELLIDO
//     nac: "CBBA", // NAC
//     ci: "12714653", // CI
//     fechaNac: "06-09-1999", // FECHA NAC
//     origen: "CBBA", // ORIGEN
//     sexo: "M", // SEXO
//     destino: "IQUIQUE", // DESTINO
//   },
//   {
//     number: 48, // N°
//     nombre: "HUMBERTO HUMBERTO", // NOMBRE
//     apellido: "LUCANA MAMANI", // APELLIDO
//     nac: "CBBA", // NAC
//     ci: "12714653", // CI
//     fechaNac: "06-09-1999", // FECHA NAC
//     origen: "CBBA", // ORIGEN
//     sexo: "M", // SEXO
//     destino: "IQUIQUE", // DESTINO
//   },
//   {
//     number: 49, // N°
//     nombre: "HUMBERTO HUMBERTO", // NOMBRE
//     apellido: "LUCANA MAMANI", // APELLIDO
//     nac: "CBBA", // NAC
//     ci: "12714653", // CI
//     fechaNac: "06-09-1999", // FECHA NAC
//     origen: "CBBA", // ORIGEN
//     sexo: "M", // SEXO
//     destino: "IQUIQUE", // DESTINO
//   },
//   {
//     number: 50, // N°
//     nombre: "HUMBERTO HUMBERTO", // NOMBRE
//     apellido: "LUCANA MAMANI", // APELLIDO
//     nac: "CBBA", // NAC
//     ci: "12714653", // CI
//     fechaNac: "06-09-1999", // FECHA NAC
//     origen: "CBBA", // ORIGEN
//     sexo: "M", // SEXO
//     destino: "IQUIQUE", // DESTINO
//   },
//   {
//     number: 51, // N°
//     nombre: "HUMBERTO HUMBERTO", // NOMBRE
//     apellido: "LUCANA MAMANI", // APELLIDO
//     nac: "CBBA", // NAC
//     ci: "12714653", // CI
//     fechaNac: "06-09-1999", // FECHA NAC
//     origen: "CBBA", // ORIGEN
//     sexo: "M", // SEXO
//     destino: "IQUIQUE", // DESTINO
//   },
//   {
//     number: 52, // N°
//     nombre: "HUMBERTO HUMBERTO", // NOMBRE
//     apellido: "LUCANA MAMANI", // APELLIDO
//     nac: "CBBA", // NAC
//     ci: "12714653", // CI
//     fechaNac: "06-09-1999", // FECHA NAC
//     origen: "CBBA", // ORIGEN
//     sexo: "M", // SEXO
//     destino: "IQUIQUE", // DESTINO
//   },
//   {
//     number: 53, // N°
//     nombre: "HUMBERTO HUMBERTO", // NOMBRE
//     apellido: "LUCANA MAMANI", // APELLIDO
//     nac: "CBBA", // NAC
//     ci: "12714653", // CI
//     fechaNac: "06-09-1999", // FECHA NAC
//     origen: "CBBA", // ORIGEN
//     sexo: "M", // SEXO
//     destino: "IQUIQUE", // DESTINO
//   },
//   {
//     number: 54, // N°
//     nombre: "HUMBERTO HUMBERTO", // NOMBRE
//     apellido: "LUCANA MAMANI", // APELLIDO
//     nac: "CBBA", // NAC
//     ci: "12714653", // CI
//     fechaNac: "06-09-1999", // FECHA NAC
//     origen: "CBBA", // ORIGEN
//     sexo: "M", // SEXO
//     destino: "IQUIQUE", // DESTINO
//   },
//   {
//     number: 55, // N°
//     nombre: "HUMBERTO HUMBERTO", // NOMBRE
//     apellido: "LUCANA MAMANI", // APELLIDO
//     nac: "CBBA", // NAC
//     ci: "12714653", // CI
//     fechaNac: "06-09-1999", // FECHA NAC
//     origen: "CBBA", // ORIGEN
//     sexo: "M", // SEXO
//     destino: "IQUIQUE", // DESTINO
//   },
//   {
//     number: 56, // N°
//     nombre: "HUMBERTO HUMBERTO", // NOMBRE
//     apellido: "LUCANA MAMANI", // APELLIDO
//     nac: "CBBA", // NAC
//     ci: "12714653", // CI
//     fechaNac: "06-09-1999", // FECHA NAC
//     origen: "CBBA", // ORIGEN
//     sexo: "M", // SEXO
//     destino: "IQUIQUE", // DESTINO
//   },
//   {
//     number: 57, // N°
//     nombre: "HUMBERTO HUMBERTO", // NOMBRE
//     apellido: "LUCANA MAMANI", // APELLIDO
//     nac: "CBBA", // NAC
//     ci: "12714653", // CI
//     fechaNac: "06-09-1999", // FECHA NAC
//     origen: "CBBA", // ORIGEN
//     sexo: "M", // SEXO
//     destino: "IQUIQUE", // DESTINO
//   },
//   {
//     number: 58, // N°
//     nombre: "HUMBERTO HUMBERTO", // NOMBRE
//     apellido: "LUCANA MAMANI", // APELLIDO
//     nac: "CBBA", // NAC
//     ci: "12714653", // CI
//     fechaNac: "06-09-1999", // FECHA NAC
//     origen: "CBBA", // ORIGEN
//     sexo: "M", // SEXO
//     destino: "IQUIQUE", // DESTINO
//   },
//   {
//     number: 59, // N°
//     nombre: "HUMBERTO HUMBERTO", // NOMBRE
//     apellido: "LUCANA MAMANI", // APELLIDO
//     nac: "CBBA", // NAC
//     ci: "12714653", // CI
//     fechaNac: "06-09-1999", // FECHA NAC
//     origen: "CBBA", // ORIGEN
//     sexo: "M", // SEXO
//     destino: "IQUIQUE", // DESTINO
//   },
//   {
//     number: 60, // N°
//     nombre: "HUMBERTO HUMBERTO", // NOMBRE
//     apellido: "LUCANA MAMANI", // APELLIDO
//     nac: "CBBA", // NAC
//     ci: "12714653", // CI
//     fechaNac: "06-09-1999", // FECHA NAC
//     origen: "CBBA", // ORIGEN
//     sexo: "M", // SEXO
//     destino: "IQUIQUE", // DESTINO
//   },
// ];

export default function ConvertirPDF({ data, dataPasajeros }) {
  // Generar lista de pasajeros directamente
  const listPasajeros = (dataPasajeros || []).map((pasajero, i) => ({
    number: i + 1,
    nombre: pasajero.nombre,
    apellido: pasajero.apellido,
    nac: "CBBA",
    ci: pasajero.ci,
    fechaNac: pasajero.fechaNacimiento,
    origen: data?.origen || "",
    sexo: pasajero.sexo === 1 ? "M" : "F",
    destino: data?.destino || "",
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
          <Text style={styles.espacioTexto}>{data.conductor1}</Text>

          <Text style={{ marginLeft: 10 }}>Licencia:</Text>
          <Text style={styles.espacioTexto}>{data.licencia1}</Text>
        </View>
        <View style={[styles.odenadoFila, styles.formulario]}>
          <Text>Conductor 2:</Text>
          <Text style={styles.espacioTexto}>{data.conductor2}</Text>

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
