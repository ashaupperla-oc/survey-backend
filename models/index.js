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

module.exports = db;
