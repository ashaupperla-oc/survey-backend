module.exports = (sequelize, Sequelize) => {
  const answer = sequelize.define("answer", {
    questionId: {
      type: Sequelize.INTEGER,
      references: {
        model: "questions",
        key: "id",
      },
    },
    clientId: {
      type: Sequelize.INTEGER,
      references: {
        model: "clients",
        key: "id",
      },
    },
    content: {
      type: Sequelize.JSON,
    },
  });
  return answer;
};
