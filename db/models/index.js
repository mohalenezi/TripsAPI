"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// User - Trip relationship
db.User.hasMany(db.Trip, { foreignKey: "userId", as: "trips" });
db.Trip.belongsTo(db.User, { as: "user" });

// User - Profile relationship
db.User.hasOne(db.Profile, { foreignKey: "userId" });
db.Profile.belongsTo(db.User, { as: "user" });

// // QA - Trip relationship
// db.Trip.hasMany(db.QA, { foreignKey: "tripId", as: "questions" });
// db.QA.belongsTo(db.Trip, { as: "trip" });

// // QA - User relationship
// db.QA.hasOne(db.User, { foreignKey: "questionerId" });
// db.User.belongsTo(db.QA);

module.exports = db;
