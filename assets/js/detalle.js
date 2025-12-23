// Lista de localidades
const localidades = [
  { id: 1, nombre: "Santiago", temp: 26, estado: "Soleado", icono: "☀️", humedad: 40, viento: 10 },
  { id: 2, nombre: "Valparaíso", temp: 20, estado: "Nublado", icono: "☁️", humedad: 60, viento: 15 },
  { id: 3, nombre: "Concepción", temp: 18, estado: "Lluvia", icono: "🌧️", humedad: 80, viento: 20 },
  { id: 4, nombre: "La Serena", temp: 23, estado: "Despejado", icono: "🌤️", humedad: 50, viento: 12 },
  { id: 5, nombre: "Antofagasta", temp: 21, estado: "Soleado", icono: "☀️", humedad: 55, viento: 18 },
  { id: 6, nombre: "Temuco", temp: 16, estado: "Lluvia", icono: "🌧️", humedad: 85, viento: 25 },
  { id: 7, nombre: "Punta Arenas", temp: 10, estado: "Viento", icono: "🌬️", humedad: 70, viento: 40 },
  { id: 8, nombre: "Rancagua", temp: 27, estado: "Soleado", icono: "☀️", humedad: 35, viento: 9 },
  { id: 9, nombre: "Talca", temp: 22, estado: "Nublado", icono: "☁️", humedad: 57, viento: 11 },
  { id: 10, nombre: "Iquique", temp: 24, estado: "Despejado", icono: "🌤️", humedad: 45, viento: 13 }
];

const pronosticoMock = [
  { dia: "Lun", icono: "☁️", temp: 20 },
  { dia: "Mar", icono: "☀️", temp: 25 },
  { dia: "Mié", icono: "🌧️", temp: 18 },
  { dia: "Jue", icono: "🌤️", temp: 22 },
  { dia: "Vie", icono: "☀️", temp: 26 },
  { dia: "Sáb", icono: "🌬️", temp: 17 },
  { dia: "Dom", icono: "☁️", temp: 21 }
];

// Lee el ID de la URL para saber qué ciudad mostrar
const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));

const localidad = localidades.find(l => l.id === id);

if (!localidad) {
  document.getElementById("tituloLocalidad").textContent = "Localidad no encontrada / Seleccione una Localidad";
} else {
  document.getElementById("tituloLocalidad").textContent = localidad.nombre;
  document.getElementById("icono").textContent = localidad.icono;
  document.getElementById("temp").textContent = `${localidad.temp}°C`;
  document.getElementById("estado").textContent = localidad.estado;
  document.getElementById("humedad").textContent = `Humedad: ${localidad.humedad}%`;
  document.getElementById("viento").textContent = `Viento: ${localidad.viento} km/h`;
}

theContainer = document.getElementById("pronosticoSemana");
pronosticoMock.forEach(dia => {
  const col = document.createElement("div");
  col.className = "col-6 col-md-3 col-lg-2";

  col.innerHTML = `
    <div class="card text-center shadow-sm p-2">
      <div class="fs-3">${dia.icono}</div>
      <h6 class="mt-2">${dia.dia}</h6>
      <p>${dia.temp}°C</p>
    </div>
  `;

  theContainer.appendChild(col);
});
