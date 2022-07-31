require("dotenv").config();

module.exports = {
  httpPort: process.env.HTTP_PORT || "8000",

  database: {
    host: process.env.host || "localhost",
    user: process.env.user || "root",
    password: process.env.password || "Summer_Project2",
    database: process.env.database || "vuesurvey",
    dialect: process.env.dialect || "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
};
