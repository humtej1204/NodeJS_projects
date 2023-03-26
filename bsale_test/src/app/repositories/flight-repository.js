const Flight = require('../models/flight');

exports.getFlight = async (flightId) => {
  const flight = await Flight.findOne({
    where: {
      flight_id: flightId,
    }
  });
  return flight.toJSON();
};