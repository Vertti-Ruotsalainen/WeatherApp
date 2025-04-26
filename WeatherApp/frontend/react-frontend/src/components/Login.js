import React, { useState } from 'react';
import './Login.css';

/**
 * Login-komponentti
 *
 * Props:
 * @param {() => void} onLoginSuccess – Funktio, jota kutsutaan onnistuneen kirjautumisen jälkeen.
 *
 * Näyttää sisäänkirjautumislomakkeen, suorittaa autentikoinnin ja tallentaa JWT-tokenin localStorageen.
 */
function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      let data;
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        data = await res.json();
      } else {
        const text = await res.text();
        data = { token: text.trim(), message: text.trim() };
      }

      if (!res.ok) {
        throw new Error(data.message || 'Kirjautuminen epäonnistui');
      }

      const token = data.token;
      localStorage.setItem('token', token);
      setSuccess(true);
      onLoginSuccess();
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Kirjaudu sisään</h2>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">Kirjautuminen onnistui</div>}
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Sähköposti"
            required
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Salasana"
            required
          />
          <button type="submit">Kirjaudu</button>
        </form>
      </div>
    </div>
  );
}

export default Login;