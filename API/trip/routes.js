const express = require("express");
const {
  deleteTrip,
  fetchTrip,
  tripFetch,
  createTrip,
  updateTrip,
} = require("./controllers");
const passport = require("passport");
const multer = require("multer");

const router = express.Router();
// ** move multer to the middleware folder so you can clean the routes... and if you are using it somewhere else will be much easier and cleaner to use right?

// Multer
const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

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
// this comment made me laugh thanks😂👆🏻 if you solved the problem please remove the comment
router.delete(
  "/:tripId",
  passport.authenticate("jwt", { session: false }),
  deleteTrip
);

// create a new trip
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  createTrip
);

// update a new trip
router.put(
  "/:tripId",
  passport.authenticate("jwt", { session: false }),
  updateTrip
);

module.exports = router;
