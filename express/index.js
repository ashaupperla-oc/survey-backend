const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.options("*", cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

// database connect to mysql
const database = require("../models");
// for not to recreate each time database but add new things

database.sequelize.sync();

// simple route
app.get("/", (req, res) => {
  res.status(200).json({ message: "your server app" });
});

require("../routes/auth")(app);
require("../routes/answer")(app);
require("../routes/survey")(app);
require("../routes/admin")(app);

module.exports = app;
