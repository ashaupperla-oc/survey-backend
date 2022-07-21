const database = require("../models");
const User = database.users;
const Role = database.roles;
const Op = database.Sequelize.Op;

// login - added functionality directly in the routes of auth js
