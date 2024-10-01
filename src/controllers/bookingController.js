const db = require('../config/database');

const bookSeat = async (req, res) => {
  const { trainId } = req.body;
  const userId = req.user.id;

  const client = await db.pool.connect();

  try {
    await client.query('BEGIN');

    const trainResult = await client.query(
      'SELECT available_seats FROM trains WHERE id = $1 FOR UPDATE',
      [trainId]
    );

    if (trainResult.rows.length === 0) {
      throw new Error('Train not found');
    }

    const availableSeats = trainResult.rows[0].available_seats;

    if (availableSeats === 0) {
      throw new Error('No seats available');
    }

    await client.query(
      'UPDATE trains SET available_seats = available_seats - 1 WHERE id = $1',
      [trainId]
    );

    const bookingResult = await client.query(
      'INSERT INTO bookings (user_id, train_id) VALUES ($1, $2) RETURNING id',
      [userId, trainId]
    );

    await client.query('COMMIT');

    res.status(201).json({ message: 'Seat booked successfully', bookingId: bookingResult.rows[0].id });
  } catch (error) {
    await client.query('ROLLBACK');
    res.status(400).json({ error: error.message });
  } finally {
    client.release();
  }
};

const getBookingDetails = async (req, res) => {
  const { bookingId } = req.params;
  const userId = req.user.id;

  try {
    const result = await db.query(
      'SELECT b.id, t.name, t.source, t.destination FROM bookings b JOIN trains t ON b.train_id = t.id WHERE b.id = $1 AND b.user_id = $2',
      [bookingId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching booking details' });
  }
};

module.exports = { bookSeat, getBookingDetails };