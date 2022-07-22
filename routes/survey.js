module.exports = (api) => {
  const surveyController = require("../controller/survey.js");
  var router = require("express").Router();

  router.post("/create", surveyController.create);

  router.put("/update", surveyController.update);

  router.delete("/delete/:id", surveyController.delete);

  router.get("/viewallsurvey", surveyController.viewallsurvey);

  router.post("/fechanswers", surveyController.fechanswers);

  router.post("/view", surveyController.view);

  // catefories the url of api
  api.use("/api/survey", router);
};
