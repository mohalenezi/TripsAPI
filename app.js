const express = require("express");
const userRoutes = require("./API/user/routes");
const { localStrategy } = require("./middleware/passport");
const cors = require("cors");

const passport = require("passport");
const db = require("./db/models");
const app = express();

app.use(express.json());
app.use(cors());
app.use(passport.initialize());
passport.use(localStrategy);

app.use(userRoutes);

const run = async () => {
  try {
    await db.sequelize.sync({ alter: true });
    console.log("Connection to the database successful!");
    await app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};

run();
