module.exports = (api) => {
  const answerController = require("../controller/answer.js");
  var router = require("express").Router();

  router.post("/create", answerController.create);
  router.post("/view", answerController.view);

  api.use("/api/answer", router);
};
