// src/components/Profile.js
import React, { useState, useEffect } from 'react';
import ErrorMessage from './UtilityComponents/ErrorMessage';
import { authFetch } from '../utils/api';
import './Profile.css';

export default function Profile({ onBack, onLogout }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    authFetch('/api/auth/me')
      .then(res => {
        if (!res.ok) throw new Error('Profiilitietojen haku epäonnistui');
        return res.json();
      })
      .then(json => setUser(json))
      .catch(err => {
        console.error('Profiili fetch error:', err);
        setError(err.message);
      });
  }, []);

  if (error) return <ErrorMessage message={error} />;
  if (!user) return <p className="loading">Ladataan profiilia…</p>;

  return (
    <div className="profile-container">
      <button className="back-btn" onClick={onBack}>← Takaisin</button>
      <h2>Omat tiedot</h2>
      <div className="profile-card">
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Nimi:</strong> {user.name}</p>
        <p><strong>Sähköposti:</strong> {user.email}</p>
        <p><strong>Rekisteröity:</strong> {new Date(user.created_at).toLocaleDateString('fi-FI')}</p>
      </div>
      <button className="logout-btn" onClick={onLogout}>Kirjaudu ulos</button>
    </div>
  );
}
