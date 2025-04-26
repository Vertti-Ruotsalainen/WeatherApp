require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./db");
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// PostgreSQL testiyhteys
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error("PostgreSQL-yhteysvirhe:", err);
    } else {
        console.log("PostgreSQL toimii! Aikaleima:", res.rows[0]);
    }
});

// Reitit
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// Testireitti
app.get("/", (req, res) => {
    res.send("Sääsovelluksen backend toimii!");
});


app.get('/api/weather', async (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).json({ message: 'City query param is required' });
  }

  const apiKey = process.env.OPENWEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather`
    + `?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;

  try {
    const weatherRes = await fetch(url);
    if (!weatherRes.ok) {
      const errorBody = await weatherRes.text();
      return res.status(weatherRes.status).json({ message: errorBody });
    }
    const data = await weatherRes.json();
    return res.json(data);
  } catch (err) {
    console.error('Weather API fetch error:', err);
    return res.status(500).json({ message: 'Palvelinvirhe', error: err.message });
  }
});

// Palvelimen käynnistys
app.listen(PORT, () => {
    console.log(`Palvelin käynnissä portissa ${PORT}`);
});
