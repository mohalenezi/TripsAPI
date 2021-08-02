module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Profile", {
    image: {
      type: DataTypes.STRING,
    },
    bio: {
      type: DataTypes.STRING,
    },
  });
};
