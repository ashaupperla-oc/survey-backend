module.exports = (api) => {
  const surveyController = require("../controller/survey.js");
  var router = require("express").Router();
  // login route
  router.post("/create", surveyController.create);
  router.get("/update", surveyController.update);
  router.get("/edit", surveyController.edit);
  router.get("/delete", surveyController.delete);
  router.post("/viewallsurvey", surveyController.viewallsurvey);
  router.post("/fechanswers", surveyController.fechanswers);
  router.post("/view", surveyController.view);

  // catefories the url of api
  api.use("/api/survey", router);
};
