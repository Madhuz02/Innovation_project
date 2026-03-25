const API_KEY = '000321bfed173ff1fab4d4fa3b3d5cc5';
const API_URL = 'https://api.openweathermap.org/data/2.5/';

document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

async function getWeatherData(city) {
  try {
    const response = await fetch(`${API_URL}weather?q=${city}&appid=${API_KEY}&units=metric`);
    if (!response.ok) throw new Error("City not found");
    const data = await response.json();

    document.getElementById('city').innerText = data.name;
    document.getElementById('temperature').innerText = `Temperature: ${data.main.temp}°C`;
    document.getElementById('condition').innerText = `Condition: ${data.weather[0].description}`;
    document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;
    document.getElementById('wind-speed').innerText = `Wind: ${data.wind.speed} m/s`;
    document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  } catch (error) {
    alert(error.message);
  }
}

async function getAirQualityData(lat, lon) {
  try {
    const response = await fetch(`${API_URL}air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
    const data = await response.json();
    const aqi = data.list[0].main.aqi;
    const desc = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];
    document.getElementById('air-quality-index').innerText = `AQI: ${aqi}`;
    document.getElementById('air-quality-description').innerText = desc[aqi - 1];
  } catch {
    document.getElementById('air-quality-index').innerText = "AQI unavailable";
  }
}

async function getWeatherAlerts(lat, lon) {
  try {
    const response = await fetch(`${API_URL}onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
    const data = await response.json();
    const container = document.getElementById('weather-alerts-container');
    container.innerHTML = "";
    if (data.alerts) {
      data.alerts.forEach(alert => {
        const div = document.createElement('div');
        div.className = 'weather-alert';
        div.innerHTML = `
          <p><strong>${alert.event}</strong></p>
          <p>${alert.description}</p>
        `;
        container.appendChild(div);
      });
    } else {
      container.innerHTML = "<p>No active alerts</p>";
    }
  } catch {
    document.getElementById('weather-alerts-container').innerHTML = "<p>Unable to load alerts</p>";
  }
}

async function init() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async pos => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      const cityData = await fetch(`${API_URL}weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
      const city = (await cityData.json()).name;
      getWeatherData(city);
      getAirQualityData(lat, lon);
      getWeatherAlerts(lat, lon);
    }, () => getWeatherData("London"));
  } else {
    getWeatherData("London");
  }
}

document.getElementById('search-btn').addEventListener('click', () => {
  const city = document.getElementById('city-input').value.trim();
  if (city) getWeatherData(city);
});

window.addEventListener('load', init);