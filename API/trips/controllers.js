/* Models */
const { Trips } = require("../../db/models");

exports.fetchTrips = async (req, res, next) => {
  try {
    const trip = await Trips.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(trip);
  } catch (error) {
    next(error);
  }
};

exports.fetchTrip = async (tripId, next) => {
  try {
    const trip = await Trips.findByPk(tripId);
    return trip;
  } catch (error) {
    next(error);
  }
};

// exports.createTrip = async (req, res, next) => {
//   try {
//     const newTrip = await Trips.create(req.body);
//     res.status(201).json(newTrip);
//   } catch (error) {
//     console.error(error);
//   }
// };

exports.deleteTrip = async (req, res, next) => {
  console.log(req.trip);
  try {
    await req.trip.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
