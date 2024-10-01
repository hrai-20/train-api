const db = require('../config/database');

class User {
  static async create(username, hashedPassword) {
    const result = await db.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id',
      [username, hashedPassword]
    );
    return result.rows[0];
  }

  static async findByUsername(username) {
    const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
    return result.rows[0];
  }

  static async findById(id) {
    const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
  }
}

module.exports = User;