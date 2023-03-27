const Passenger = require('../models/passenger');

exports.getbyId = async (passengerId) => {
    const passengers = await Passenger.findOne({
      where: {
        passenger_id: passengerId,
      }
    });
    
    return passengers.toJSON();
};