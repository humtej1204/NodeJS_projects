const flightRepository = require('../repositories/flight-repository');
const boardingPassRepository = require('../repositories/boarding-pass-repository');

exports.getFlight = async (flightId) => {
  const flight = await flightRepository.getFlightById(flightId);
  const boardingpasses = await boardingPassRepository.getBpPassengerbyFlightId(flightId);

  flight.passengers = boardingpasses;

  return flight;
};