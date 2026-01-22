document.addEventListener("DOMContentLoaded", () => {
  // Validar datos
  if (typeof lugares === "undefined") {
    console.error("ERROR: data.js no está cargando");
    return;
  }

  // Obtener ID desde la URL
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));

  if (!id) {
    console.error("ERROR: No se recibió id por la URL");
    return;
  }

  // Buscar localidad
  const lugar = lugares.find(l => l.id === id);

  if (!lugar) {
    console.error("ERROR: No se encontró la localidad con id:", id);
    return;
  }

  // Clima actual
  document.getElementById("tituloLocalidad").textContent = lugar.nombre;
  document.getElementById("icono").textContent = lugar.icono;
  document.getElementById("temp").textContent = `${lugar.tempActual}°C`;
  document.getElementById("estado").textContent = lugar.estadoActual;
  document.getElementById("humedad").textContent = `Humedad: ${lugar.humedad}%`;
  document.getElementById("viento").textContent = `Viento: ${lugar.viento} km/h`;

  // Pronóstico semanal
  const contenedorPronostico = document.getElementById("pronosticoSemana");
  contenedorPronostico.innerHTML = "";

  lugar.pronosticoSemanal.forEach(dia => {
    contenedorPronostico.innerHTML += `
      <div class="col-12 col-md-4">
        <div class="card text-center h-100">
          <div class="card-body">
            <h5>${dia.dia}</h5>
            <p>${dia.min}°C / ${dia.max}°C</p>
            <p>${dia.estado}</p>
          </div>
        </div>
      </div>
    `;
  });

  // Estadísticas de la semana
  function calcularEstadisticas(pronostico) {
    let minSemana = pronostico[0].min;
    let maxSemana = pronostico[0].max;
    let suma = 0;
    let estados = {};

    for (let dia of pronostico) {
      if (dia.min < minSemana) minSemana = dia.min;
      if (dia.max > maxSemana) maxSemana = dia.max;

      suma += (dia.min + dia.max) / 2;

      estados[dia.estado] = (estados[dia.estado] || 0) + 1;
    }

    const promedio = (suma / pronostico.length).toFixed(1);

    let resumen = "Semana con clima variable.";
    if ((estados["Soleado"] || 0) > pronostico.length / 2) {
      resumen = "Semana mayormente soleada.";
    } else if ((estados["Lluvia"] || 0) >= 3) {
      resumen = "Semana lluviosa.";
    }

    return { minSemana, maxSemana, promedio, resumen };
  }

  const stats = calcularEstadisticas(lugar.pronosticoSemanal);

  document.getElementById("estadisticas").innerHTML = `
    <li class="list-group-item">Mínima semanal: ${stats.minSemana}°C</li>
    <li class="list-group-item">Máxima semanal: ${stats.maxSemana}°C</li>
    <li class="list-group-item">Promedio semanal: ${stats.promedio}°C</li>
  `;

  document.getElementById("resumenSemana").textContent = stats.resumen;
});
