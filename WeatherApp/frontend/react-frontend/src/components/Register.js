import { useState, useEffect } from "react";

export default function Register({ onRegisterSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("Token löytyi localStoragesta.");
      // Voit lisätä automaattisen uudelleenohjauksen jos haluat
    }
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5001/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Rekisteröityminen onnistui! Voit nyt kirjautua sisään.");
      onRegisterSuccess();
    } else {
      alert(data.message || "Rekisteröityminen epäonnistui.");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Luo käyttäjä</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nimi"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Sähköposti"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Salasana"
        required
      />
      <button type="submit">Rekisteröidy</button>
    </form>
  );
}
