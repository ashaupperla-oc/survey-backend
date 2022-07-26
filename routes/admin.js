module.exports = (api) => {
  const adminController = require("../controller/admin.js");

  var router = require("express").Router();

  router.get("/", adminController.getlist); //removed list
  router.put("/update", adminController.udpate);
  router.put("/updatepassword", adminController.passwordupdate);
  router.delete("/:id", adminController.delete); //done
  router.get("/:id", adminController.getAdmin);
  router.post("/register", adminController.register); //done

  api.use("/api/admin", router);
};
