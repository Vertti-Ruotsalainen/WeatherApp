import { useState, useEffect } from "react";

export default function UserProfile({ onBack }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:5001/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setUser(data))
        .catch((err) => setError("Virhe käyttäjätietojen haussa."));
    }
  }, []);

  return (
    <div className="user-profile">
      <h2>Käyttäjäprofiili</h2>
      {error && <p>{error}</p>}
      {user ? (
        <div>
          <p><strong>Nimi:</strong> {user.name}</p>
          <p><strong>Sähköposti:</strong> {user.email}</p>
        </div>
      ) : (
        <p>Ladataan...</p>
      )}
      <button onClick={onBack}>Palaa sääsivulle</button>
    </div>
  );
}
