const express = require('express');
const router = express.Router();
const flightController = require('../app/controllers/flight-controller');

router.use('/flights', flightController);

module.exports = router;