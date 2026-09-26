# Weather App

A small, responsive weather app that looks up current conditions for a city using the [OpenWeatherMap Current Weather API](https://openweathermap.org/current). It displays the temperature, weather description, city and country, feels-like temperature, and humidity.

## Features

- Search by city name.
- Show current conditions in Celsius.
- Display a matching weather illustration.
- Show loading and error messages for searches.
- Keyboard friendly search form and screen reader status updates.

## Run locally

This is a static website and does not need a build step or package installation.

1. Clone or download this repository.
2. Copy `config.example.js` to `config.js` and put your OpenWeatherMap API key in `config.js`.
3. Open `index.html` in a browser, or serve the folder with a local static web server.
4. Enter a city name and submit the search.

An internet connection is required to load weather data and the Boxicons stylesheet.

## API key and deployment

The app reads `window.WEATHER_API_KEY` from `config.js`. That file is ignored by Git so a local key is not added to commits. `config.example.js` is a safe template and contains no real key.

This is a browser-only app, so any key placed in `config.js` is still visible to visitors if the app is published. For a public deployment, send weather requests through a server-side endpoint that reads the key from an environment variable. If a key has already been committed or published, revoke it and create a replacement in your OpenWeatherMap account; deleting it from the latest version does not remove it from Git history.

## Project files

```text
.
├── images/
│   ├── background.gif
│   └── *.svg              Weather condition illustrations
├── favicon.png
├── config.example.js      Safe local API key template
├── config.js              Local API key (ignored by Git)
├── index.html             Page structure
├── script.js              Search, API request, and rendering
├── style.css              Layout and responsive styles
└── README.md
```

## Credits

- Weather data: [OpenWeatherMap](https://openweathermap.org/)
- Icons: [Boxicons](https://boxicons.com/)
