module.exports = (api) => {
  const answerController = require("../controller/answer.js");
  var router = require("express").Router();
  // login route
  router.post("/create", answerController.create);
  router.post("/view", answerController.view);

  // catefories the url of api
  api.use("/api/answer", router);
};
