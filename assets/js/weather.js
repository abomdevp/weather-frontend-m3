/**
 * Clase encargada de las peticiones a la API externa
 */
class WeatherService {
    constructor() {
        this.baseUrl = "https://api.open-meteo.com/v1/forecast";
    }

    async getWeatherData(lat, lon) {
        try {
            const url = `${this.baseUrl}?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weathercode&current_weather=true&timezone=auto`;
            const response = await fetch(url);
            if (!response.ok) throw new Error("Error en la respuesta de la red");
            return await response.json();
        } catch (error) {
            console.error("Error al obtener datos:", error);
            throw error;
        }
    }
}

/**
 * Clase principal que gestiona la aplicación
 */
class WeatherApp {
    constructor() {
        this.service = new WeatherService();
        this.lugares = [
            { id: 1, nombre: "Santiago", lat: -33.45, lon: -70.67 },
            { id: 2, nombre: "Valparaíso", lat: -33.05, lon: -71.61 },
            { id: 3, nombre: "La Serena", lat: -29.90, lon: -71.25 },
            { id: 4, nombre: "Puerto Varas", lat: -41.32, lon: -72.98 },
            { id: 5, nombre: "San Pedro de Atacama", lat: -22.91, lon: -68.20 }
        ];
    }

    // Traduce códigos de Open-Meteo a emojis y texto
    parseWeatherCode(code) {
        if (code === 0) return { icon: "☀️", texto: "Despejado" };
        if (code < 50) return { icon: "☁️", texto: "Nublado" };
        return { icon: "🌧️", texto: "Lluvia" };
    }

    async cargarHome(contenedorId) {
        const contenedor = document.getElementById(contenedorId);
        if (!contenedor) return;

        contenedor.innerHTML = `<div class="text-center">Cargando clima actual...</div>`;

        try {
            let html = "";
            for (const lugar of this.lugares) {
                const data = await this.service.getWeatherData(lugar.lat, lugar.lon);
                const info = this.parseWeatherCode(data.current_weather.weathercode);
                
                html += `
                    <div class="col-md-4 mb-4">
                        <div class="card text-center h-100 shadow-sm">
                            <div class="card-body">
                                <h3>${lugar.nombre}</h3>
                                <p class="display-4">${info.icon}</p>
                                <p class="h4">${data.current_weather.temperature}°C</p>
                                <p>${info.texto}</p>
                                <a href="detalle.html?id=${lugar.id}" class="btn btn-primary">Ver detalle</a>
                            </div>
                        </div>
                    </div>`;
            }
            contenedor.innerHTML = html;
        } catch (error) {
            contenedor.innerHTML = `<div class="alert alert-danger">Error al conectar con el servicio de clima.</div>`;
        }
    }

    async cargarDetalle(id) {
        const lugar = this.lugares.find(l => l.id === id);
        if (!lugar) return;

        try {
            const data = await this.service.getWeatherData(lugar.lat, lugar.lon);
            this.renderDetalle(lugar.nombre, data);
            this.renderEstadisticas(data.daily);
        } catch (error) {
            document.body.innerHTML += `<div class="alert alert-danger">Error al cargar detalle.</div>`;
        }
    }

    renderDetalle(nombre, data) {
        const info = this.parseWeatherCode(data.current_weather.weathercode);
        document.getElementById("tituloLocalidad").textContent = nombre;
        document.getElementById("icono").textContent = info.icon;
        document.getElementById("temp").textContent = `${data.current_weather.temperature}°C`;
        document.getElementById("estado").textContent = info.texto;
        
        const pronosticoContenedor = document.getElementById("pronosticoSemana");
        pronosticoContenedor.innerHTML = data.daily.time.map((fecha, i) => `
            <div class="col-12 col-md-4">
                <div class="card text-center h-100">
                    <div class="card-body">
                        <h5>${new Date(fecha).toLocaleDateString('es-ES', {weekday: 'long'})}</h5>
                        <p>${data.daily.temperature_2m_min[i]}°C / ${data.daily.temperature_2m_max[i]}°C</p>
                        <p>${this.parseWeatherCode(data.daily.weathercode[i]).texto}</p>
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderEstadisticas(daily) {
        const maxs = daily.temperature_2m_max;
        const mins = daily.temperature_2m_min;
        
        const maxAbs = Math.max(...maxs);
        const minAbs = Math.min(...mins);
        const promedio = (maxs.reduce((a, b) => a + b, 0) / maxs.length).toFixed(1);

        document.getElementById("estadisticas").innerHTML = `
            <li class="list-group-item">Máxima absoluta: ${maxAbs}°C</li>
            <li class="list-group-item">Mínima absoluta: ${minAbs}°C</li>
            <li class="list-group-item">Promedio de máximas: ${promedio}°C</li>
        `;

        // Lógica de Alertas
        let alertaHtml = "";
        if (promedio > 25) {
            alertaHtml = `<div class="alert alert-warning">⚠️ Alerta de Calor: Promedio semanal elevado.</div>`;
        } else if (daily.weathercode.filter(c => c > 50).length >= 3) {
            alertaHtml = `<div class="alert alert-info">🌧️ Alerta: Se esperan varios días de lluvia.</div>`;
        }
        document.getElementById("resumenSemana").innerHTML = alertaHtml;
    }
}