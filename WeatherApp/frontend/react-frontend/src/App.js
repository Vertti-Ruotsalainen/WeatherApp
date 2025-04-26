// src/App.js
import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Login from './components/Login';
import Register from './components/Register';
import WeatherView from './components/WeatherView';

function App() {
  const [view, setView] = useState('login');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const { exp } = jwtDecode(token);
        if (Date.now() / 1000 < exp) {
          setView('weather');
          return;
        }
        throw new Error('Token expired');
      } catch {
        localStorage.removeItem('token');
      }
    }
    setView('login');
  }, []);

  return (
    <>
      {view === 'login' && (
        <Login onLoginSuccess={() => setView('weather')} />
      )}
      {view === 'register' && (
        <Register onRegister={() => setView('login')} />
      )}
      {view === 'weather' && (
        <WeatherView
          onLogout={() => {
            localStorage.removeItem('token');
            setView('login');
          }}
          onProfile={() => setView('profile')}
        />
      )}
      {/* Profiili‐näkymä mukaan tarvittaessa */}
    </>
  );
}

export default App;
