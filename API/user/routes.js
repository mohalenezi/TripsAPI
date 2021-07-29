const express = require("express");
const { signup, signin } = require("./controllers");
const router = express.Router();
const passport = require("passport");

router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);

router.post("/signup", signup);

module.exports = router;
