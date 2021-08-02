const express = require("express");
const { updateProfile, fetchProfile, profileFetch } = require("./controllers");
const passport = require("passport");
const multer = require("multer");

const router = express.Router();

router.param("profileId", async (req, res, next, profileId) => {
  const profile = await fetchProfile(profileId, next);

  if (profile) {
    req.profile = profile;
    next();
  } else {
    const error = new Error("Profile Not Found");
    error.status = 404;
    next(error);
  }
});

// Multer
const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// update a new trip
router.put(
  "/:profileId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  updateProfile
);

router.get("/", profileFetch);

module.exports = router;
