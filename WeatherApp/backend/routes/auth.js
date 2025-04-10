const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../db");
require("dotenv").config();

// POST /api/auth/register
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
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
        console.error(err);
        res.status(500).json({ message: "Palvelinvirhe." });
    }
});

module.exports = router;
