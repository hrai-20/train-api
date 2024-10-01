const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

const checkDatabaseConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('Successfully connected to the database');
    client.release();
    return true;
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
    return false;
  }
};

module.exports = {
  query: (text, params) => pool.query(text, params),
  checkDatabaseConnection,
};