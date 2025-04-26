// src/components/Forecast.js
import React, { useState, useEffect } from 'react';
import ErrorMessage from './UtilityComponents/ErrorMessage';

/**
 * Forecast-komponentti
 *
 * Props:
 * @param {string} city – Kaupungin nimi, jota ennuste koskee.
 */
export default function Forecast({ city }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!city) return;

    const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
    const url =
      `https://api.openweathermap.org/data/2.5/forecast` +
      `?q=${encodeURIComponent(city)}` +
      `&units=metric&cnt=40&appid=${apiKey}`;

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Forecast-API virhe');
        return res.json();
      })
      .then(json => {
        // Valitaan ennusteet aina klo 12:00:00
        const midday = json.list.filter(item =>
          item.dt_txt.endsWith('12:00:00')
        );
        setData(midday.slice(0, 5));
      })
      .catch(err => {
        console.error('Forecast fetch error:', err);
        setError('Ei saatu ennustetta – yritä myöhemmin');
      });
  }, [city]);

  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="forecast-window">
      {data.map(item => {
        const { icon, description } = item.weather[0];
        return (
          <div className="forecast-card" key={item.dt}>
            <h3>
              {new Date(item.dt_txt).toLocaleDateString('fi-FI', {
                weekday: 'short',
                day: 'numeric',
                month: 'numeric'
              })}
            </h3>
            {/* Uusi sääikoni */}
            <div className="forecast-icon">
              <img
                src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                alt={description}
                title={description}
              />
            </div>
            <p>{item.main.temp.toFixed(1)}°C</p>
          </div>
        );
      })}
    </div>
  );
}
