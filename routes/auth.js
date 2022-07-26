module.exports = (api) => {
  const authController = require("../controller/auth.js");
  const database = require("../models");
  const User = database.users;
  const jwt = require("jsonwebtoken");

  var router = require("express").Router();

  router.post("/login", function (req, res) {
    User.findOne({ where: { email: req.body.email } }).then((data) => {
      if (data) {
        if (
          req.body.password === data.password &&
          (data.roleId == 1 || data.roleId == 2)
        ) {
          let token = jwt.sign({ userId: data.id }, "vueserver");
          return res.json({
            status: 200,

            userId: data.id,
            token: token,
            msg: "successfully logged in",
          });
        } else
          return res.status(200).json({
            status: 401,
            error: "Invalid Password",
            userId: 0,
          });
      } else {
        return res.status(200).json({
          status: 401,
          error: `Invalid credintials`,
        });
      }
    });
  });

  api.use("/api/auth", router);
};
