const express = require("express");
const cors = require("cors");

const app = express();
const db = require("./db/models");

app.use(cors());

const run = async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Connection to the database successful!");
    await app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};

run();
