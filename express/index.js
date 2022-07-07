// require('./Auth');
const { static, Router } = require("express");
const api = Router();
const config = require("../config");
const session = require("express-session");
const cors = require('cors');
const bodyParser = require('body-parser');

var corsOptions = {
  origin: '*',
};

api.use(cors(corsOptions));
api.options('*', cors());
api.use(bodyParser.urlencoded({
  extended: true
}));
api.use(bodyParser.json());

// database connect to mysql
const database = require("../models");
// for not to recreate each time database but add new things
 database.sequelize.sync();


// simple route
api.get("/", (req, res) => {
  res.json({ message: "your server api" });
});


require("../routes/auth")(api);
require("../routes/answer")(api);
require("../routes/survey")(api);

module.exports = api;
