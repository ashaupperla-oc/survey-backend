module.exports = (sequelize, Sequelize) => {
  const client = sequelize.define("client", {
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      unique: true
    },
    phone_no: {
      type: Sequelize.STRING,
    },
  });
  return client;
};

