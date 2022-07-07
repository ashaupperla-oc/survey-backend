module.exports = (sequelize, Sequelize) => {
  const role = sequelize.define("role", {
    rolename: {
      type: Sequelize.STRING,
    },
  });
  return role;
};
