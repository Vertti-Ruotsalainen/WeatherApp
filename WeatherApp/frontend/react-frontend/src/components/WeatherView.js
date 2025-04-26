// src/components/WeatherView.js
import React, { useState, useEffect } from "react";
import "./WeatherView.css";
//import SearchBar from "./UtilityComponents/Searchbar";
import ErrorMessage from "./UtilityComponents/ErrorMessage";
import Forecast from "./Forecast";

/**
 * WeatherView-komponentti
 *
 * Props:
 * @param {() => void} onLogout – Funktio, jota kutsutaan kun käyttäjä haluaa kirjautua ulos.
 * @param {() => void} onProfile – Funktio, jota kutsutaan kun käyttäjä avaa profiilinsa.
 */
function WeatherView({ onLogout, onProfile }) {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [showForecast, setShowForecast] = useState(false);

  useEffect(() => {
    // Jos haluat hakea automaattisesti esim. viimeisimmän kaupungin,
    // voit laittaa tänne setCity(...) ja fetchWeather(...)
  }, []);

  const fetchWeather = async (inputCity = city) => {
    try {
      setError("");
      setWeather(null);

      // Lue API-avain .env-tiedostosta (REACT_APP_OPENWEATHER_API_KEY)
      const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
      if (!apiKey) {
        throw new Error("API-avain puuttuu ympäristömuuttujasta");
      }

      const url =
        `https://api.openweathermap.org/data/2.5/weather` +
        `?q=${encodeURIComponent(inputCity)}` +
        `&units=metric` +
        `&appid=${apiKey}`;

      const res = await fetch(url);
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "OpenWeatherMap-virhe");
      }
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      console.error("Virhe haettaessa säätietoja:", err);
      setError(
        err.message.includes("city")
          ? "Kaupunki ei löytynyt."
          : "Ei saatu säätietoja – yritä myöhemmin uudelleen"
      );
    }
  };

  return (
    <div className="weather-app">
      <header className="weather-header">
        <button className="profile-btn" onClick={onProfile}>
          Profiili
        </button>
        <h1 className="app-title">Sääsovellus</h1>
        <button className="logout-btn" onClick={onLogout}>
          Kirjaudu ulos
        </button>

        <div className="search-container">
          <input
            className="city-input"
            type="text"
            value={city}
            placeholder="Syötä kaupunki..."
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && fetchWeather(city)}
          />
          <button
            className="search-button"
            onClick={() => fetchWeather(city)}
          >
            Hae
          </button>
        </div>
         {/* Toggle nykyisen ja 5pv näkymän välillä */}
       {weather && (
         <div className="view-toggle">
           <button
             className={!showForecast ? 'active' : ''}
             onClick={() => setShowForecast(false)}
           >
             Nykyinen sää
           </button>
           <button
             className={showForecast ? 'active' : ''}
             onClick={() => setShowForecast(true)}
           >
             5pv sää
           </button>
         </div>
       )}
      </header>

      <main>
        {error && <ErrorMessage message={error} />}
        {weather && !showForecast && (
         <div className="weather-window">
           <div className="weather-card">
             <h2>{weather.name}</h2>
             <div className="weather-icon">
         <img
           src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
           alt={weather.weather[0].description}
           title={weather.weather[0].description}
         />
       </div>
             <p>Lämpötila: {weather.main.temp.toFixed(1)}°C</p>
       {/* korvaava ikoni-linj a */}
       <p>Tuulen nopeus: {weather.wind.speed} m/s</p>
           </div>
         </div>
       )}

       {showForecast && city && (
         <Forecast city={city} />
       )}
        
      </main>
    </div>
  );
}

export default WeatherView;
