const { questions } = require("../models");
const database = require("../models");
const Survey = database.surveys;
const Question = database.questions;
const Answer = database.answers;
const Op = database.Sequelize.Op;
var randomWords = require("random-words");

exports.create = (req, res, next) => {
  // if (req.headers.userid == null) {
  //   return res.status(401).json({ msg: "Unauthorized userid" });
  // }
  // if (req.headers.token == null) {
  //   return res.status(401).json({ msg: "Unauthorized token" });
  // }
  // if (
  //   req.headers.userid !=
  //   JSON.parse(atob(req.headers.token.split(".")[1])).userId
  // ) {
  //   return res.status(401).json({ msg: "Unauthorized" });
  // }


  const questionList = req.body.questionsList;
  const userId = req.body.userId;
  const surveyName = req.body.surveyName;
  if (questionList.length === 0) {
    return res.json({ status: 500, error: "no question selected" });
  } else {
    let randomWord = randomWords({ exactly: 2, join: "" });
    const data = {
      surveyName: surveyName,
      userId: userId,
    };
    Survey.create(data)
      .then((data) => {
        const surveyId = data.id;
        questionList.forEach((element) => {
          const question_data = {
            surveyId: surveyId,
            content: element,
          };
          Question.create(question_data);
          next();
        });
        next();
      })
      .catch((e) => {
        return res.status(400).json({ msg: "Survey creation failed" });
      });
  }
  return res.status(200).json({ msg: "Survey create" });
  next();
};

exports.update = (req, res, next) => {
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

  const questionsList = req.body.questionsList;
  var surveyid = req.body.surveyid;

  var surveyMetaData = {
    userId: 1,
  };
  Survey.findOne({
    where: { id: surveyid },
  }).then((surveyRecord) => {
    surveyMetaData = {
      id: surveyRecord.id,
      surveyName: surveyRecord.surveyName,
      userId: surveyRecord.userId,
    };
    Survey.destroy({
      where: { id: req.body.surveyid },
    }).then((data) => {
      if (questionsList.length === 0) {
        return res.json({ status: 500, error: "no question selected" });
      } else {
        Survey.create(surveyMetaData)
          .then((data) => {
            const surveyId = data.id;
            questionsList.forEach((element) => {
              const question_data = {
                surveyId: surveyId,
                content: element,
              };
              Question.create(question_data);
              next();
            });
            next();
          })
          .catch((e) => {
            return res.status(400).json({ msg: "Survey creation failed" });
          });
      }
    });
  });

  return res.status(200).json({ msg: "Survey update" });
};

exports.delete = (req, res, next) => {
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


  Survey.destroy({
    where: { id: req.params.id },
  })
    .then((data) => {
      if (data == 1) {
        return res.status(200).json({ msg: "survey deleted successfully" });
      } else {
        return res.status(400).json({ msg: "survey not found" });
      }
    })
    .catch((error) => {
      return res.status(500);
    });
};

exports.viewallsurvey = (req, res, next) => {
  Survey.findAll()
    .then((surveys) => {
      console.log(surveys);
      return res.json(surveys);
      next();
    })
    .catch((e) => {
      return res.json({ msg: "All Surveys Fetch Failed" });
    });
};

exports.fechanswers = (req, res, next) => {
  var id = req.body.surveyId;

  var someQuestion = [];

  Survey.findOne({
    where: {
      id: id,
    },
  }).then((survey) => {
    // surveys.forEach((survey) => {
    Question.findAll({
      where: {
        surveyId: survey.id,
      },
    })
      .then((questions) => {
        questions.forEach((question) => {
          someQuestion.push(question);
        });
      })
      .then(() => {
        return res.json(someQuestion);
      });
  });
};
exports.view = (req, res, next) => {
  Survey.findOne({
    where: {
      id: req.params.surveyId,

    },
  })
    .then((data) => {
      const surveyid = data.id;
      Question.findAll({
        where: {
          surveyId: surveyid,
        },
      })
        .then((questions) => {
          console.log(questions);
          return res.json(questions);
          next();
        })
        .catch((e) => {
          return res.json({ msg: "Questions fetched failed" });
        });
    })
    .catch((e) => {
      return res.json({ msg: "Survey fetched failed" });
    });
};
