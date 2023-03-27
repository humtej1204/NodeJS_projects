const BoardingPass = require('../models/boarding_pass');
const Passenger = require('../models/passenger');

exports.getBpPassengerbyFlightId = async (flightId) => {
    const boardingPasses = await BoardingPass.findAll({
      where: {
        flight_id: flightId,
      },
      include: [{
        model: Passenger,
        attributes: [],
      }],
      attributes: [
        'passengerId',
        'Passenger.dni',
        'Passenger.name',
        'Passenger.age',
        'Passenger.country',
        'boardingPassId',
        'purchaseId',
        'seatTypeId',
        'seatId',
      ],
      raw: true,
    });
    return boardingPasses;
};