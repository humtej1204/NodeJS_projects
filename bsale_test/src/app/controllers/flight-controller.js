const express = require('express');
const router = express.Router();

const flightService = require('../services/flight-service');

router.get('/:id', async (req, res, next) => {
  try {
    const flight = await flightService.getFlight(req.params.id);
    if (!flight) {
      res.status(404).json({
        "code": 404,
        "data": {}
      });
    }
    res.status(200).json({
      "code": 200,
      "data": flight
    });
  } catch (error) {
    next(error);
    res.status(400).json({
      "code": 400,
      "errors": "could not connect to db"
    });
  }
});

module.exports = router;