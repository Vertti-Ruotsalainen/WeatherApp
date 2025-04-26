import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import UserProfile from "./components/UserProfile";
import WeatherView from "./components/WeatherView";

function App() {
  const [view, setView] = useState("login");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setView("weather");
    } else {
      setView("login");
    }
  }, []);

  return (
    <div className="App">
      {view === "login" && <Login onLoginSuccess={() => setView("weather")} />}
      {view === "register" && <Register onRegister={() => setView("login")} />}
      {view === "weather" && (
        <WeatherView
          onLogout={() => {
            localStorage.removeItem("token");
            setView("login");
          }}
          onProfile={() => setView("profile")}
        />
      )}
      {view === "profile" && (
        <UserProfile onBack={() => setView("weather")} />
      )}
    </div>
  );
}

export default App;