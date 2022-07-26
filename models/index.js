const config = require("../config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.database.database,
  config.database.user,
  config.database.password,
  {
    host: config.database.host,
    dialect: config.database.dialect,
    operatorsAliases: false,
    pool: {
      max: config.database.pool.max,
      min: config.database.pool.min,
      acquire: config.database.pool.acquire,
      idle: config.database.pool.idle,
    },
  }
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.roles = require("./role.model.js")(sequelize, Sequelize);
db.users = require("./user.model.js")(sequelize, Sequelize);
db.surveys = require("./survey.model.js")(sequelize, Sequelize);
db.questions = require("./question.model.js")(sequelize, Sequelize);
db.answers = require("./answer.model.js")(sequelize, Sequelize);
db.clients = require("./client.model.js")(sequelize, Sequelize);

// db.users.hasOne(db.roles);
db.questions.hasMany(db.answers, {
  foreignKey: "questionId",
  onDelete: "CASCADE",
});
db.answers.belongsTo(db.questions, { foreignKey: "questionId" });

db.surveys.hasMany(db.questions, {
  foreignKey: "surveyId",
  onDelete: "CASCADE",
});
db.questions.belongsTo(db.surveys, { foreignKey: "surveyId" });

module.exports = db;
