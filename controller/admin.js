const database = require("../models");
const User = database.users;
const Survey = database.surveys;
const Role = database.roles;
const Op = database.Sequelize.Op;

const jwt = require("jsonwebtoken");

exports.getlist = (req, res, next) => {
  const adminId = req.params.id;

  // if (req.headers.userid == null) {
  //   return res.status(401).json({ msg: "Unauthorized" });
  // }
  // if (req.headers.token == null) {
  //   return res.status(401).json({ msg: "Unauthorized" });
  // }
  // if (
  //   req.headers.userid !=
  //   JSON.parse(atob(req.headers.token.split(".")[1])).userId
  // ) {
  //   return res.status(401).json({ msg: "Unauthorized" });
  // }
  // if (req.headers.userid != 1) {
  //   return res.status(400).json({ error: "user is not permitted" });
  // }


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
  // if (req.headers.userid == null) {
  //   return res.status(401).json({ msg: "Unauthorized" });
  // }
  // if (req.headers.token == null) {
  //   return res.status(401).json({ msg: "Unauthorized" });
  // }
  // if (
  //   req.headers.userid !=
  //   JSON.parse(atob(req.headers.token.split(".")[1])).userId
  // ) {
  //   return res.status(401).json({ msg: "Unauthorized" });
  // }

  User.findOne({
    where: { id: adminId },
  })
    .then((user) => {
      if (user == null) {
        return res.status(400).json({ msg: "admin not found" });
      }

      return res.status(200).json(user);
    })
    .catch((e) => {
      return res.json({ msg: "Admins Fetch Failed" });
    });
};

exports.delete = (req, res, next) => {
  const adminId = req.params.id;
  // if (req.headers.userid == null) {
  //   return res.status(401).json({ msg: "Unauthorized" });
  // }
  // if (req.headers.token == null) {
  //   return res.status(401).json({ msg: "Unauthorized" });
  // }
  // if (req.headers.userid != 1) {
  //   return res.status(400).json({ error: "user is not permitted" });
  // }
  // if (
  //   req.headers.userid !=
  //   JSON.parse(atob(req.headers.token.split(".")[1])).userId
  // ) {
  //   return res.status(401).json({ msg: "Unauthorized" });
  // }


  Survey.update(
    {
      userId: 1,
    },
    {
      where: { userId: adminId },
    }
  ).then((data) => {
    if (data == 0) {
      return res.status(400).json({ msg: "admin not found" });
    }
    User.destroy({
      where: { id: adminId },
    }).then((data) => {
      return res.status(200).json({ msg: "admin removed successfully" });

    });
  });
};

exports.udpate = (req, res, next) => {
  const adminId = req.body.id;
  const adminName = req.body.name;
  const adminEmail = req.body.email;

  // if (req.headers.userid == null) {
  //   return res.status(401).json({ msg: "Unauthorized" });
  // }
  // if (req.headers.token == null) {
  //   return res.status(401).json({ msg: "Unauthorized" });
  // }
  // if (
  //   req.headers.userid !=
  //   JSON.parse(atob(req.headers.token.split(".")[1])).userId
  // ) {
  //   return res.status(401).json({ msg: "Unauthorized" });
  // }


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
      if (data == 0) {
        return res.status(400).json({ msg: "admin not found" });
      }

      return res.status(200).json({ msg: "Admin Updated Successfully" });
    })
    .catch((error) => {
      return res
        .status(500)
        .json({ msg: "Admin Updation Failed, Bad Request" + error });
    });
};

exports.passwordupdate = (req, res, next) => {
  // if (req.headers.userid == null) {
  //   return res.status(401).json({ msg: "Unauthorized" });
  // }
  // if (req.headers.token == null) {
  //   return res.status(401).json({ msg: "Unauthorized" });
  // }
  // if (
  //   req.headers.userid !=
  //   JSON.parse(atob(req.headers.token.split(".")[1])).userId
  // ) {
  //   return res.status(401).json({ msg: "Unauthorized" });
  // }

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
  // if (req.headers.userid == null) {
  //   return res.status(401).json({ msg: "Unauthorized" });
  // }
  // if (req.headers.token == null) {
  //   return res.status(401).json({ msg: "Unauthorized" });
  // }
  // if (req.headers.userid != 1) {
  //   return res.status(400).json({ error: "user is not permitted" });
  // }
  // if (
  //   req.headers.userid !=
  //   JSON.parse(atob(req.headers.token.split(".")[1])).userId
  // ) {
  //   return res.status(401).json({ msg: "Unauthorized" });
  // }

  User.findOne({
    where: { email: req.body.email },
  })
    .then((user) => {
      if (user != null) {
        return res.status(400).json({ msg: "user already exist" });
      }
    })
    .catch((e) => {
      return res.json({ msg: "Admins Fetch Failed" });
    });

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
        return res.status(200).json({ msg: "user registered successfully" });
      })
      .catch((e) => {
        return res.status(400).json({ msg: "user registered failed" });

      });
  });
};
