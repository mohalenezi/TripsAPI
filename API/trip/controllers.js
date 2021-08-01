// import the model
const { Trip } = require("../../db/models");

exports.fetchTrip = async (tripId, next) => {
  try {
    const trip = await Trip.findByPk(tripId);
    return trip;
  } catch (error) {
    next(error);
  }
};

exports.tripFetch = async (req, res, next) => {
  try {
    const trips = await Trip.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(trips);
  } catch (error) {
    next(error);
  }
};

exports.createTrip = async (req, res, next) => {
  try {
    if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`;
    req.body.userId = req.user.id;
    const newTrip = await Trip.create(req.body);
    res.status(201).json(newTrip); // response end with created trip
  } catch (error) {
    next(error);
  }
};

exports.deleteTrip = async (req, res, next) => {
  // Do you need this line?
  const foundTrip = await Trip.findByPk(req.trip.userId);
  try {
    if (foundTrip.userId === req.user.id) {
      await foundTrip.destroy();
      res.status(204).end();
    } else {
      const err = new Error("unauth "); // give a more meaningful message shda3wa -.-
      err.status = 401;
      return next(err);
    }
  } catch (error) {
    next(error);
  }
};

exports.updateTrip = async (req, res, next) => {
  try {
    if (req.file) req.body.image = `http://${req.get("host")}/${eq.file.path}`;
    const updatedTrip = await req.trip.update(req.body);
    res.json(updatedTrip);
  } catch (error) {
    next(error);
  }
};
