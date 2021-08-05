module.exports = (sequelize, DataTypes) => {
  return sequelize.define("QA", {
    question: {
      type: DataTypes.STRING,
    },
    answer: {
      type: DataTypes.STRING,
    },
  });
};
