const form = document.querySelector('#weather-form');
const cityInput = document.querySelector('#inputTxt');
const searchButton = document.querySelector('#searchBtn');
const weatherSection = document.querySelector('#weather');
const statusMessage = document.querySelector('#status');

const API_KEY = window.WEATHER_API_KEY;
const WEATHER_ICONS = {
    clear: 'clear',
    clouds: 'cloud',
    drizzle: 'rain',
    rain: 'rain',
    snow: 'snow',
    thunderstorm: 'storm',
    mist: 'haze',
    smoke: 'haze',
    haze: 'haze',
    dust: 'haze',
    fog: 'haze',
    sand: 'haze',
    ash: 'haze',
    squall: 'storm',
    tornado: 'storm'
};

form.addEventListener('submit', (event) => {
    event.preventDefault();
    searchWeather(cityInput.value.trim());
});

async function searchWeather(city) {
    if (!city) {
        showStatus('Enter a city name to search.');
        cityInput.focus();
        return;
    }

    if (!API_KEY || API_KEY === 'YOUR_OPENWEATHERMAP_API_KEY') {
        weatherSection.hidden = true;
        showStatus('Add your OpenWeatherMap API key to config.js before searching.');
        return;
    }

    setLoading(true);

    const query = new URLSearchParams({
        units: 'metric',
        lang: 'en',
        q: city,
        appid: API_KEY
    });

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?${query}`);
        const weather = await response.json();

        if (!response.ok) {
            throw new Error(weather.message || 'Could not retrieve weather for that city.');
        }

        renderWeather(weather);
    } catch (error) {
        weatherSection.hidden = true;
        showStatus(error.message === 'Failed to fetch'
            ? 'Weather data could not be reached. Check your connection and try again.'
            : `Unable to get weather: ${error.message}`);
    } finally {
        setLoading(false);
    }
}

function renderWeather(weather) {
    const condition = weather.weather[0];
    const iconName = WEATHER_ICONS[condition.main.toLowerCase()] || 'storm';
    const countryName = new Intl.DisplayNames(['en'], { type: 'region' })
        .of(weather.sys.country) || weather.sys.country;

    weatherSection.querySelector('#temperature').textContent = `${Math.round(weather.main.temp)} °C`;
    weatherSection.querySelector('#condition-icon').src = `images/${iconName}.svg`;
    weatherSection.querySelector('#condition-icon').alt = condition.description;
    weatherSection.querySelector('#description').textContent = condition.description;
    weatherSection.querySelector('#location').innerHTML = '<i class="bx bx-map" aria-hidden="true"></i>';
    weatherSection.querySelector('#location').append(`${weather.name}, ${countryName}`);
    weatherSection.querySelector('#feels-like').innerHTML = '<i class="bx bxs-thermometer" aria-hidden="true"></i>';
    weatherSection.querySelector('#feels-like').append(`${Math.round(weather.main.feels_like)} °C Feels like`);
    weatherSection.querySelector('#humidity').innerHTML = '<i class="bx bxs-droplet-half" aria-hidden="true"></i>';
    weatherSection.querySelector('#humidity').append(`${weather.main.humidity}% Humidity`);
    weatherSection.hidden = false;
    showStatus('');
}

function showStatus(message) {
    statusMessage.textContent = message;
    statusMessage.hidden = !message;
}

function setLoading(isLoading) {
    searchButton.disabled = isLoading;
    searchButton.setAttribute('aria-busy', String(isLoading));
    cityInput.disabled = isLoading;
    if (isLoading) showStatus('Loading weather…');
}
