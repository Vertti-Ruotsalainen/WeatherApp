const pool = require("./db");

async function createTables() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS user_preferences (
        user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
        location VARCHAR(100) NOT NULL,
        units VARCHAR(20) NOT NULL
      );
    `);

    console.log("✅ Taulut 'users' ja 'user_preferences' luotu onnistuneesti.");
  } catch (err) {
    console.error("❌ Virhe taulujen luonnissa:", err.message);
  } finally {
    pool.end();
  }
}

createTables();