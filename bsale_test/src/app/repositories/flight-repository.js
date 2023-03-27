const Flight = require('../models/flight');

exports.getFlightById = async (flightId) => {
  const flight = await Flight.findOne({
    where: {
      flight_id: flightId,
    },
  });
  return flight.toJSON();
};