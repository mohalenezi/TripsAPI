const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Profile } = require("../../db/models");
const { JWT_SECERT, JWT_EXPIRATION_MS } = require("../../config/keys");

exports.signup = async (req, res, next) => {
  const { password } = req.body;
  const saltRounds = 10;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    req.body.password = hashedPassword;

    const newUser = await User.create(req.body);
    // 👇🏻 please clean this up
    await Profile.create({
      image: "",
      bio: "",
      userId: newUser.id,
      username: newUser.username,
    });
    // 👆🏻
    const payload = {
      id: newUser.id,
      username: newUser.username,
      exp: Date.now() + JWT_EXPIRATION_MS,
    };
    const token = jwt.sign(JSON.stringify(payload), JWT_SECERT);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  const { user } = req;
  const payload = {
    id: user.id,
    username: user.username,
    exp: Date.now() + JWT_EXPIRATION_MS,
  };
  const token = jwt.sign(JSON.stringify(payload), JWT_SECERT);
  res.json({ token });
};
