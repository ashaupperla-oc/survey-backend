module.exports = (api) => {
  const adminController = require("../controller/admin.js");

  var router = require("express").Router();

  router.get("/list", adminController.getlist);
  router.put("/update", adminController.udpate);
  router.put("/updatepassword", adminController.passwordupdate);
  router.delete("/delete/:id", adminController.delete);
  router.get("/get/:id", adminController.getAdmin);
  router.post("/register", adminController.register);

  api.use("/api/admin", router);
};
