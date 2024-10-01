const db = require('../config/database');

class Train {
  static async create(name, source, destination, totalSeats) {
    const result = await db.query(
      'INSERT INTO trains (name, source, destination, total_seats, available_seats) VALUES ($1, $2, $3, $4, $4) RETURNING *',
      [name, source, destination, totalSeats]
    );
    return result.rows[0];
  }

  static async findByRoute(source, destination) {
    const result = await db.query(
      'SELECT * FROM trains WHERE source = $1 AND destination = $2',
      [source, destination]
    );
    return result.rows;
  }

  static async updateAvailableSeats(id, change) {
    const result = await db.query(
      'UPDATE trains SET available_seats = available_seats + $1 WHERE id = $2 RETURNING *',
      [change, id]
    );
    return result.rows[0];
  }

  static async findById(id) {
    const result = await db.query('SELECT * FROM trains WHERE id = $1', [id]);
    return result.rows[0];
  }
}

module.exports = Train;