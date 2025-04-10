require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./db");

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

// Palvelimen käynnistys
app.listen(PORT, () => {
    console.log(`Palvelin käynnissä portissa ${PORT}`);
});
