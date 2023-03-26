const flightRepository = require('../repositories/flight-repository');

exports.getFlight = async (flightId) => {
  const flight = await flightRepository.getFlight(flightId);
  return flight;
};