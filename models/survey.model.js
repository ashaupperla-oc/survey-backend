module.exports = (sequelize, Sequelize) => {
  const survey = sequelize.define("survey", {
    surveyName: {
      type: Sequelize.STRING,
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
  });
  return survey;
};
