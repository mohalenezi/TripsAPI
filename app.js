const express = require("express");
const cors = require("cors");
const passport = require("passport");
const { jwtStrategy, localStrategy } = require("./middleware/passport");

// Routes
const userRoutes = require("./API/user/routes");
const tripRoutes = require("./API/trip/routes");
const profileRoutes = require("./API/profile/routes");

// Database
const db = require("./db/models");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

// CRUD Routes
app.use(userRoutes);
app.use("/trips", tripRoutes);
app.use("/profiles", profileRoutes);

// Store media
app.use("/media", express.static("media"));

// Error Middleware
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error." });
});

// Path Not Found middleware
app.use((req, res, next) => {
  res.status(404).json({ message: "Path not found." });
});

const run = async () => {
  try {
    await db.sequelize.sync({ alter: true });
    console.log("Connection to the database successful!");
    await app.listen(8000, () => {
      console.log("The application is running on port 8000");
    });
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};

run();
