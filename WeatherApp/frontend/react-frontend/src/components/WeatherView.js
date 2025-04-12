import { useState, useEffect } from "react";
import "./WeatherView.css";

export default function WeatherView({ onLogout, onProfile }) {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthorized(false);
    } else {
      fetch("http://localhost:5001/api/auth/preferences", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.location) {
            setCity(data.location);
            fetchWeather(data.location);
          }
        })
        .catch((err) => console.error("Virhe haettaessa asetuksia:", err));
    }
  }, []);

  const fetchWeather = async (inputCity = city) => {
    if (!inputCity) return;
    const apiKey = "bfa5bea0c2b5473f5c11514a3782068c";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&units=metric&lang=fi&appid=${apiKey}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setWeather(data);

      const token = localStorage.getItem("token");
      await fetch("http://localhost:5001/api/auth/preferences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ location: inputCity, units: "metric" }),
      });

    } catch (error) {
      console.error("Virhe haettaessa säätietoja:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    if (onLogout) onLogout();
  };

  if (!isAuthorized) {
    return <p>Et ole kirjautunut sisään. Palaa kirjautumissivulle.</p>;
  }

  return (
    <div className="weather-app">
      <header className="unified-header">
        <button className="profile-button fixed-left" onClick={onProfile}>Profiili</button>
        <button className="logout-button fixed-right" onClick={handleLogout}>Kirjaudu ulos</button>
        <div className="header-content">
          <div className="header-center">
            <h1>Sääsovellus</h1>
            <div className="search-bar">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Syötä kaupunki..."
              />
              <button onClick={() => fetchWeather()}>Hae sää</button>
            </div>
          </div>
        </div>
      </header>

      <main>
        {weather && (
          <div id="weatherContainer">
            <h2>{weather.name}</h2>
            <p>Lämpötila: {weather.main.temp}°C</p>
            <p>{weather.weather[0].description}</p>
            <p>Tuulen nopeus: {weather.wind.speed} m/s</p>
          </div>
        )}
      </main>
    </div>
  );
}
