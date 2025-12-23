// Lista de localidades
const localidades = [
{ id: 1, nombre: "Santiago", temp: 26, estado: "Soleado", icono: "☀️" },
{ id: 2, nombre: "Valparaíso", temp: 20, estado: "Nublado", icono: "☁️" },
{ id: 3, nombre: "Concepción", temp: 18, estado: "Lluvia", icono: "🌧️" },
{ id: 4, nombre: "La Serena", temp: 23, estado: "Despejado", icono: "🌤️" },
{ id: 5, nombre: "Antofagasta", temp: 21, estado: "Soleado", icono: "☀️" },
{ id: 6, nombre: "Temuco", temp: 16, estado: "Lluvia", icono: "🌧️" },
{ id: 7, nombre: "Punta Arenas", temp: 10, estado: "Viento", icono: "🌬️" },
{ id: 8, nombre: "Rancagua", temp: 27, estado: "Soleado", icono: "☀️" },
{ id: 9, nombre: "Talca", temp: 22, estado: "Nublado", icono: "☁️" },
{ id: 10, nombre: "Iquique", temp: 24, estado: "Despejado", icono: "🌤️" }
];

const cardContainer = document.getElementById("cardContainer");

// Función que genera las cards en el inicio
localidades.forEach(loc => {
const col = document.createElement("div");
col.className = "col-12 col-sm-6 col-md-4 col-lg-3 mb-4";

col.innerHTML = `
<div class="card h-100 shadow-sm card-localidad" data-id="${loc.id}" style="cursor:pointer;">
<div class="card-body text-center">
<div class="fs-1">${loc.icono}</div>
<h5 class="card-title mt-2">${loc.nombre}</h5>
<p class="card-text">${loc.temp}°C - ${loc.estado}</p>
</div>
</div>
`;

col.addEventListener("click", () => {
window.location.href = `detalle.html?id=${loc.id}`;
});

cardContainer.appendChild(col);
});