const database = require("../models");
const User = database.users;
const Role = database.roles;
const Op = database.Sequelize.Op;

// login - added functionality directly in the routes of auth js

exports.register = (req, res, next) => {
  console.log(req.body.email);
  Role.findOne({
    where: {
      rolename: "admin",
    },
  }).then((rolerecord) => {
    let splitString = "";
    if (req.body.email != "") {
      splitString = req.body.email.split("@")[0];
    }
    if (splitString === "") {
      splitString = req.body.email;
    }
    const userdata = {
      name: splitString,
      email: req.body.email,
      password: req.body.password,
      roleId: rolerecord.id,
    };
    User.create(userdata)
      .then((data) => {
        return res.json({ msg: "user registered successfully" });
      })
      .catch((e) => {
        return res.json({ msg: "user registered failed" });
      });
  });
};
