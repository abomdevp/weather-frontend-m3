const lugares = [
  {
    id: 1,
    nombre: "Santiago",
    tempActual: 26,
    estadoActual: "Soleado",
    icono: "☀️",
    humedad: 40,
    viento: 10,
    pronosticoSemanal: [
      { dia: "Lunes", min: 18, max: 26, estado: "Soleado" },
      { dia: "Martes", min: 17, max: 25, estado: "Soleado" },
      { dia: "Miércoles", min: 16, max: 22, estado: "Nublado" },
      { dia: "Jueves", min: 15, max: 21, estado: "Lluvia" },
      { dia: "Viernes", min: 16, max: 23, estado: "Soleado" }
    ]
  },
  {
    id: 2,
    nombre: "Valparaíso",
    tempActual: 22,
    estadoActual: "Nublado",
    icono: "☁️",
    humedad: 70,
    viento: 18,
    pronosticoSemanal: [
      { dia: "Lunes", min: 17, max: 22, estado: "Nublado" },
      { dia: "Martes", min: 16, max: 21, estado: "Nublado" },
      { dia: "Miércoles", min: 15, max: 20, estado: "Lluvia" },
      { dia: "Jueves", min: 14, max: 19, estado: "Lluvia" },
      { dia: "Viernes", min: 15, max: 20, estado: "Nublado" }
    ]
  },
  {
    id: 3,
    nombre: "La Serena",
    tempActual: 24,
    estadoActual: "Soleado",
    icono: "☀️",
    humedad: 55,
    viento: 12,
    pronosticoSemanal: [
      { dia: "Lunes", min: 18, max: 24, estado: "Soleado" },
      { dia: "Martes", min: 17, max: 23, estado: "Soleado" },
      { dia: "Miércoles", min: 16, max: 22, estado: "Soleado" },
      { dia: "Jueves", min: 16, max: 21, estado: "Nublado" },
      { dia: "Viernes", min: 17, max: 23, estado: "Soleado" }
    ]
  },
  {
    id: 4,
    nombre: "Puerto Varas",
    tempActual: 18,
    estadoActual: "Lluvia",
    icono: "🌧️",
    humedad: 80,
    viento: 14,
    pronosticoSemanal: [
      { dia: "Lunes", min: 12, max: 18, estado: "Lluvia" },
      { dia: "Martes", min: 11, max: 17, estado: "Lluvia" },
      { dia: "Miércoles", min: 10, max: 16, estado: "Nublado" },
      { dia: "Jueves", min: 11, max: 17, estado: "Lluvia" },
      { dia: "Viernes", min: 12, max: 18, estado: "Lluvia" }
    ]
  },
  {
    id: 5,
    nombre: "San Pedro de Atacama",
    tempActual: 28,
    estadoActual: "Soleado",
    icono: "☀️",
    humedad: 20,
    viento: 8,
    pronosticoSemanal: [
      { dia: "Lunes", min: 20, max: 30, estado: "Soleado" },
      { dia: "Martes", min: 19, max: 29, estado: "Soleado" },
      { dia: "Miércoles", min: 18, max: 28, estado: "Soleado" },
      { dia: "Jueves", min: 19, max: 29, estado: "Soleado" },
      { dia: "Viernes", min: 20, max: 30, estado: "Soleado" }
    ]
  }
];

function obtenerLugarPorId(id) {
  return lugares.find(lugar => lugar.id === id);
}

function calcularEstadisticas(pronostico) {
  let minSemana = pronostico[0].min;
  let maxSemana = pronostico[0].max;
  let suma = 0;
  let contadorEstados = {};

  for (let dia of pronostico) {
    if (dia.min < minSemana) minSemana = dia.min;
    if (dia.max > maxSemana) maxSemana = dia.max;

    suma += (dia.min + dia.max) / 2;

    if (contadorEstados[dia.estado]) {
      contadorEstados[dia.estado]++;
    } else {
      contadorEstados[dia.estado] = 1;
    }
  }

  const promedio = (suma / pronostico.length).toFixed(1);

  let resumen = "Semana variable.";
  if ((contadorEstados["Soleado"] || 0) > pronostico.length / 2) {
    resumen = "Semana mayormente soleada.";
  } else if ((contadorEstados["Lluvia"] || 0) > 2) {
    resumen = "Semana lluviosa.";
  }

  return {
    minSemana,
    maxSemana,
    promedio,
    contadorEstados,
    resumen
  };
}
