import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import WeatherView from "./components/WeatherView";
import UserProfile from "./components/UserProfile";

function App() {
  const [view, setView] = useState("login");

  return (
    <div className="App">
      {view === "login" && (
        <>
          <Login onLoginSuccess={() => setView("weather")} />
          <p>
            Ei vielä käyttäjää?{" "}
            <button onClick={() => setView("register")}>Luo tunnus</button>
          </p>
        </>
      )}

      {view === "register" && (
        <>
          <Register onRegisterSuccess={() => setView("login")} />
          <p>
            Onko sinulla jo käyttäjä?{" "}
            <button onClick={() => setView("login")}>Kirjaudu sisään</button>
          </p>
        </>
      )}

      {view === "weather" && (
        <WeatherView
          onLogout={() => setView("login")}
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
