// const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Trip = sequelize.define("Trip", {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING },
  });
  // SequelizeSlugify.slugifyModel(Trip, { source: ["title"] });
  return Trip;
};
