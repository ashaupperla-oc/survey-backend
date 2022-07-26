module.exports = (sequelize, Sequelize) => {
  const question = sequelize.define("question", {
    surveyId: {
      type: Sequelize.INTEGER,
      references: {
        model: "surveys",
        key: "id",
      },
    },
    content: {
      type: Sequelize.JSON,
    },
  });

  return question;
};
