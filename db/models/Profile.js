module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Profile", {
    image: {
      type: DataTypes.STRING,
    },
    bio: {
      type: DataTypes.STRING,
    },
    /*the profile belongs to one user right? and if you check table plus you will see that in the profile model you have the userId, so you can get the username from the userId.
    we call this DATA Redundancy! you already have the username in the user model */
    username: {
      type: DataTypes.STRING,
    },
  });
};
