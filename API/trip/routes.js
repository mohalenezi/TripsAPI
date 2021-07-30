const express = require("express");
const {
  deleteTrip,
  fetchTrip,
  tripFetch,
  createTrip,
} = require("./controllers");
const passport = require("passport");

const router = express.Router();

router.param("tripId", async (req, res, next, tripId) => {
  const trip = await fetchTrip(tripId, next);

  if (trip) {
    req.trip = trip;
    next();
  } else {
    const error = new Error("Trip Not Found");
    error.status = 404;
    next(error);
  }
});

router.get("/", tripFetch);

// Zamami don't forget the authentication problem!!!...... 7ather from my eyes ^_^
router.delete(
  "/:tripId",
  passport.authenticate("jwt", { session: false }),
  deleteTrip
);

// create a new trip
router.post("/", passport.authenticate("jwt", { session: false }), createTrip);

module.exports = router;
