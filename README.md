# App de Clima – Módulo 5 (Final)

## Descripción
Evolución de la aplicación de clima desarrollada originalmente en el Módulo 4. En esta iteración, se ha reestructurado completamente la lógica bajo el paradigma de **Programación Orientada a Objetos (POO)** y se ha implementado el consumo de datos reales mediante una **API externa** de forma asíncrona.

---

## Arquitectura y Lógica (POO)
La aplicación está organizada mediante clases para garantizar un código modular y escalable:
- **WeatherApp**: Clase principal que gestiona la lógica de negocio, los lugares y la coordinación de la interfaz.
- **WeatherService / ApiClient**: Encargado exclusivamente de las peticiones `fetch` a la API de clima (Open-Meteo).
- **Módulos Lógicos**: Separación de responsabilidades para el renderizado del DOM, cálculo de estadísticas y gestión de errores.

---

## Nuevas Funcionalidades (Módulo 5)
- **Consumo de API Real**: La información ya no es estática; se obtiene en tiempo real utilizando `async/await` y promesas.
- **Alertas de Clima**: Implementación de reglas de negocio que generan avisos automáticos (ej. "Alerta de Calor" si el promedio supera los 25°C o "Semana Lluviosa").
- **Estadísticas Dinámicas**: Cálculos de temperatura mínima, máxima y promedio generados a partir de los datos frescos de la API.
- **Manejo de Errores**: Interfaz resiliente que informa al usuario en caso de fallos en la conexión o en la respuesta del servidor.

---

## Tecnologías y Estándares (ES6+)
- **JavaScript Moderno**: Uso extensivo de `let/const`, `arrow functions`, `template literals` y desestructuración.
- **Programación Asíncrona**: Uso de la Fetch API para solicitudes HTTP.
- **HTML5 & CSS3/SASS**: Estructura semántica y estilos avanzados.
- **Bootstrap 5**: Componentes dinámicos y diseño responsivo (Mobile First).

---

## Autor
**Francisco González – 2025** [Repositorio del Proyecto](https://github.com/abomdevp/weather-frontend-m3)  
*Proyecto de práctica Frontend enfocado en lógica avanzada y consumo de servicios externos.*