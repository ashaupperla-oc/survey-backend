const database = require("../models");
const User = database.users;
const Survey = database.surveys;
const Role = database.roles;
const Op = database.Sequelize.Op;

exports.getlist = (req, res, next) => {
  User.findAll()
    .then((user) => {
      return res.json(user);
      next();
    })
    .catch((e) => {
      return res.json({ msg: "Admins Fetch Failed" });
    });
};

exports.getAdmin = (req, res, next) => {
  const adminId = req.params.id;
  User.findOne({
    where: { id: adminId },
  })
    .then((user) => {
      return res.status(200).json(user);
    })
    .catch((e) => {
      return res.json({ msg: "Admins Fetch Failed" });
    });
};

exports.delete = (req, res, next) => {
  const adminId = req.params.id;

  Survey.update(
    {
      userId: 1,
    },
    {
      where: { userId: adminId },
    }
  ).then((data) => {
    User.destroy({
      where: { id: adminId },
    }).then((data) => {
      return res.json({ msg: "admin removed successfully" });
    });
  });
};

exports.udpate = (req, res, next) => {
  const adminId = req.body.id;
  const adminName = req.body.name;
  const adminEmail = req.body.email;

  User.update(
    {
      name: adminName,
      email: adminEmail,
    },
    {
      where: { id: adminId },
    }
  )
    .then((data) => {
      return res.status(200).json({ msg: "Admin Updated Successfully" });
    })
    .catch((error) => {
      return res
        .status(500)
        .json({ msg: "Admin Updation Failed, Bad Request" + error });
    });
};

exports.passwordupdate = (req, res, next) => {
  console.log(req.body);
  const adminId = req.body.id;
  User.findOne({
    where: { id: adminId },
  }).then((data) => {
    console.log(data);
    if (data.password != req.body.oldpassword) {
      console.log("Incorrect password provided");
      return res.status(400).json({ msg: "Incorrect password provided" });
    } else {
      User.update(
        {
          password: req.body.newpassword,
        },
        {
          where: { id: adminId },
        }
      ).then((data) => {
        console.log("res", data);
        return res.status(200).json({ msg: "password updated successfully" });
      });
    }
  });
};

exports.register = (req, res, next) => {
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
