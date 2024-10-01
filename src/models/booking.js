const db = require('../config/database');

class Booking {
  static async create(userId, trainId) {
    const result = await db.query(
      'INSERT INTO bookings (user_id, train_id) VALUES ($1, $2) RETURNING id',
      [userId, trainId]
    );
    return result.rows[0];
  }

  static async findById(id) {
    const result = await db.query(
      'SELECT b.id, t.name, t.source, t.destination FROM bookings b JOIN trains t ON b.train_id = t.id WHERE b.id = $1',
      [id]
    );
    return result.rows[0];
  }

  static async findByUserAndId(userId, bookingId) {
    const result = await db.query(
      'SELECT b.id, t.name, t.source, t.destination FROM bookings b JOIN trains t ON b.train_id = t.id WHERE b.id = $1 AND b.user_id = $2',
      [bookingId, userId]
    );
    return result.rows[0];
  }
}

module.exports = Booking;