const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',          // Vaihda jos loit toisen käyttäjän
  host: 'localhost',
  database: 'weatherapp',    // Tietokannan nimi, jonka loit pgAdminissa
  password: 'FaskiaVenytt3ly*',  // PostgreSQL-käyttäjän salasana
  port: 5432
});

module.exports = pool;
