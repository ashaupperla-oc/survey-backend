const database = require("../models");
const Answer = database.answers;
const Client = database.clients;
const Op = database.Sequelize.Op;

exports.create = (req, res, next) => {
  Client.findOne({ where: { email: req.body[0].email } }).then((data) => {
    if (data === null) {
      const client = {
        name: req.body[0].full_name,
        email: req.body[0].email,
        phone_no: req.body[0].phone_no,
      };

      Client.create(client).then((client_data) => {
        req.body.forEach((answer) => {
          const answer_value = {
            questionId: answer.questionId,
            content: answer.content,
            clientId: client_data.id,
          };
          Answer.create(answer_value);
        });
      });
    } else {
      req.body.forEach((answer) => {
        const answer_value = {
          questionId: answer.questionId,
          content: answer.content,
          clientId: data.id,
        };
        Answer.create(answer_value);
      });
    }
  });

  return res.json(req.body);
};

exports.view = (req, res, next) => {
  var allAnswers = [];

  Answer.findAll({ where: { questionId: req.body.id } })
    .then((data) => {
      return res.json(data);
      next();
    })
    .catch((e) => {
      return res.json(e);
    });
};
