document.addEventListener("DOMContentLoaded", () => {
  // Validar datos
  if (typeof lugares === "undefined") {
    console.error("ERROR: data.js no está cargando o 'lugares' no existe");
    return;
  }

  const contenedor = document.getElementById("cardContainer");

  if (!contenedor) {
    console.error("ERROR: No se encontró #cardContainer en el HTML");
    return;
  }

  contenedor.innerHTML = "";

  lugares.forEach((lugar) => {
    contenedor.innerHTML += `
      <div class="col-md-4 mb-4">
        <div class="card text-center h-100">
          <div class="card-body">
            <h3>${lugar.nombre}</h3>
            <p class="display-4">${lugar.icono}</p>
            <p>${lugar.tempActual}°C</p>
            <p>${lugar.estadoActual}</p>
            <a href="detalle.html?id=${lugar.id}" class="btn btn-primary">
              Ver detalle
            </a>
          </div>
        </div>
      </div>
    `;
  });
});
