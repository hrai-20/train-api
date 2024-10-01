const express = require('express');
const { bookSeat, getBookingDetails } = require('../controllers/bookingController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, bookSeat);
router.get('/:bookingId', auth, getBookingDetails);

module.exports = router;