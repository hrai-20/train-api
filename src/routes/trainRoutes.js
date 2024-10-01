const express = require('express');
const { addTrain, getSeatAvailability } = require('../controllers/trainController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

router.post('/', auth, adminAuth, addTrain);
router.get('/availability', auth, getSeatAvailability);

module.exports = router;