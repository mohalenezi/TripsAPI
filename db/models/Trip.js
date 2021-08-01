// const SequelizeSlugify = require("sequelize-slugify");

// remove the commented code
module.exports = (sequelize, DataTypes) => {
  const Trip = sequelize.define("Trip", {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING },
  });
  // SequelizeSlugify.slugifyModel(Trip, { source: ["title"] });
  return Trip;
};
