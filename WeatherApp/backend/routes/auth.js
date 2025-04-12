const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../db");
require("dotenv").config();

// Middleware: Tarkistaa JWT-tokenin
function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Token puuttuu." });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Virheellinen token." });
        }
        req.user = user;
        next();
    });
}

// POST /api/auth/register
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    console.log("name:", name);
    console.log("email:", email);
    console.log("password:", password);

    try {
        const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: "Sähköposti on jo käytössä." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
            [name, email, hashedPassword]
        );

        res.status(201).json({ message: "Käyttäjä rekisteröity onnistuneesti." });
    } catch (err) {
        console.error("Rekisteröintivirhe:", err);
        res.status(500).json({ message: "Palvelinvirhe", error: err.message });
    }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        const user = result.rows[0];

        if (!user) {
            return res.status(400).json({ message: "Virheellinen kirjautuminen." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Virheellinen salasana." });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    } catch (err) {
        console.error("Kirjautumisvirhe:", err);
        res.status(500).json({ message: "Palvelinvirhe", error: err.message });
    }
});

// GET /api/auth/me - suojattu reitti
router.get("/me", authenticateToken, async (req, res) => {
    try {
        const result = await pool.query("SELECT id, name, email, created_at FROM users WHERE id = $1", [req.user.id]);
        const user = result.rows[0];
        res.json(user);
    } catch (err) {
        console.error("Virhe suojatussa reitissä:", err);
        res.status(500).json({ message: "Palvelinvirhe", error: err.message });
    }
});

// PUT /api/auth/me - päivitä käyttäjän nimi tai sähköposti
router.put("/me", authenticateToken, async (req, res) => {
    const { name, email } = req.body;
    try {
        await pool.query(
            "UPDATE users SET name = $1, email = $2 WHERE id = $3",
            [name, email, req.user.id]
        );
        res.json({ message: "Käyttäjän tiedot päivitetty." });
    } catch (err) {
        console.error("Virhe päivityksessä:", err);
        res.status(500).json({ message: "Palvelinvirhe", error: err.message });
    }
});

// POST /api/auth/preferences - tallenna sääasetukset
router.post("/preferences", authenticateToken, async (req, res) => {
    const { location, units } = req.body; // esim. "Helsinki", "metric"
    try {
        await pool.query(
            "INSERT INTO user_preferences (user_id, location, units) VALUES ($1, $2, $3) ON CONFLICT (user_id) DO UPDATE SET location = $2, units = $3",
            [req.user.id, location, units]
        );
        res.json({ message: "Sääasetukset tallennettu." });
    } catch (err) {
        console.error("Virhe sääasetuksissa:", err);
        res.status(500).json({ message: "Palvelinvirhe", error: err.message });
    }
});

// GET /api/auth/preferences - hae sääasetukset
router.get("/preferences", authenticateToken, async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT location, units FROM user_preferences WHERE user_id = $1",
            [req.user.id]
        );
        res.json(result.rows[0] || {});
    } catch (err) {
        console.error("Virhe sääasetusten haussa:", err);
        res.status(500).json({ message: "Palvelinvirhe", error: err.message });
    }
});

module.exports = router;
