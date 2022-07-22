// require('./Auth');
const { static, Router } = require("express");
const api = Router();
const config = require("../config");
const session = require("express-session");
<<<<<<< HEAD
const cors = require("cors");
const bodyParser = require("body-parser");

var corsOptions = {
  origin: "*",
};

api.use(cors(corsOptions));
api.options("*", cors());
api.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
=======
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
>>>>>>> c0a177c2caff4a23864972e4d134ffb95e0e6879
api.use(bodyParser.json());

// database connect to mysql
const database = require("../models");
// for not to recreate each time database but add new things
<<<<<<< HEAD

database.sequelize.sync();
=======
 database.sequelize.sync();

>>>>>>> c0a177c2caff4a23864972e4d134ffb95e0e6879

// simple route
api.get("/", (req, res) => {
  res.json({ message: "your server api" });
});

<<<<<<< HEAD
require("../routes/auth")(api);
require("../routes/answer")(api);
require("../routes/survey")(api);
require("../routes/admin")(api);
=======

require("../routes/auth")(api);
require("../routes/answer")(api);
require("../routes/survey")(api);
>>>>>>> c0a177c2caff4a23864972e4d134ffb95e0e6879

module.exports = api;
