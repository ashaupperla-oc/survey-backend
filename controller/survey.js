const { questions } = require("../models");
const database = require("../models");
const Survey = database.surveys;
const Question = database.questions;
const Answer = database.answers;
const Op = database.Sequelize.Op;
var randomWords = require("random-words");

exports.create = (req, res, next) => {
  console.log("survey create sserver", req.body);
  console.log("number of questionsin a survey", req.body.length);

  // if (req.body.questionsList.length === 0) { //with this getting the headers cannot be send after request sent error
  if (req.body.length === 0) {
    return res.json({ status: 500, error: "no question selected" });
  } else {
    let randomWord = randomWords({ exactly: 2, join: "" });
    const data = {
      surveyName: randomWord,
      userId: 1,
      url: randomWord,
    };
    Survey.create(data)
      .then((data) => {
        const surveyId = data.id;
        req.body.forEach((element) => {
          console.log(element.id);

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
        return res.json({ msg: "Survey creation failed" });
      });
  }
  return res.json({ msg: "Survey create" });
  next();
};

exports.update = (req, res, next) => {
  return res.json({ msg: "Survey update" });
};

exports.edit = (req, res, next) => {
  return res.json({ msg: "Survey edit" });
};

exports.delete = (req, res, next) => {
  return res.json({ msg: "Survey delete" });
};

exports.viewallsurvey = (req, res, next) => {
  Survey.findAll()
    .then((surveys) => {
      return res.json(surveys);
      next();
    })
    .catch((e) => {
      return res.json({ msg: "All Surveys Fetch Failed" });
    });
};

exports.fechanswers = (req, res, next) => {
  var url = req.body.url;

  // questions id list
  // where answers ka questionid list
  var someQuestion = [];

  Survey.findOne({
    where: {
      surveyName: url,
    },
  }).then((survey) => {
    // surveys.forEach((survey) => {
    console.log(survey.id);
    Question.findAll({
      where: {
        surveyId: survey.id,
      },
    })
      .then((questions) => {
        questions.forEach((question) => {
          // console.log(question.id);
          someQuestion.push(question);
        });
      })
      .then(() => {
        return res.json(someQuestion);
      })
      .then(() => {
        // return res.json({ msg: allAnswers });
      });
    // });
  });
};

