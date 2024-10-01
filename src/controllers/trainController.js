const db = require('../config/database');

const addTrain = async (req, res) => {
  const { name, source, destination, totalSeats } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO trains (name, source, destination, total_seats, available_seats) VALUES ($1, $2, $3, $4, $4) RETURNING *',
      [name, source, destination, totalSeats]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error adding train' });
  }
};

const getSeatAvailability = async (req, res) => {
  const { source, destination } = req.query;
  try {
    const result = await db.query(
      'SELECT * FROM trains WHERE source = $1 AND destination = $2',
      [source, destination]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching seat availability' });
  }
};

module.exports = { addTrain, getSeatAvailability };