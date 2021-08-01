/* Models */
const { Trip } = require("../../db/models");

exports.fetchTrips = async (req, res, next) => {
  try {
    const trip = await Trip.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(trip);
  } catch (error) {
    next(error);
  }
};

exports.fetchTrip = async (tripId, next) => {
  try {
    const trip = await Trip.findByPk(tripId);
    return trip;
  } catch (error) {
    next(error);
  }
};

exports.createTrip = async (req, res, next) => {
  try {
    if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`;
    req.body.userId = req.user.id;
    const newTrip = await Trip.create(req.body);
    res.status(201).json(newTrip);
  } catch (error) {
    console.error(error);
  }
};

exports.deleteTrip = async (req, res, next) => {
  try {
    /* The user adding the trip must be the creator*/
    if (req.user.id !== req.trip.userId) {
      const error = new Error("Unauthorized.");
      error.status = 401;
      return next(error);
    }
    await req.trip.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
