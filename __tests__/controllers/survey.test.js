jest.mock("../../models");
const { surveys, questions } = require("../../models");
const request = require("supertest");
const app = require("../../express");

describe("survey.test.js", () => {
  it("survey.create()", async () => {
    surveys.create.mockReturnValueOnce(Promise.resolve("Survey create"));
    questions.create.mockReturnValueOnce(Promise.resolve("Survey create"));
    await request(app)
      .post("/api/survey/create")
      .set("userid", 1)
      .set("token", "abcdef.ghij.klmnop")
      .send({ questionsList: ["quest1"] })
      .expect(200)
      .expect((res) => {
        expect(res.body.msg).toEqual("Survey create");
      });
  });

  it("survey.update()", async () => {
    surveys.findOne.mockReturnValueOnce(Promise.resolve([{ id: 1 }]));
    surveys.destroy.mockReturnValueOnce(Promise.resolve([{ id: 1 }]));
    surveys.create.mockReturnValueOnce(Promise.resolve("Survey create"));
    questions.create.mockReturnValueOnce(Promise.resolve("Survey create"));

    await request(app)
      .put("/api/survey/update")
      .set("userid", 1)
      .set("token", "abcdef.ghij.klmnop")
      .send({ questionsList: ["quest1"], surveyid: 1 })
      .expect(200)
      .expect((res) => {
        expect(res.body.msg).toEqual("Survey update");
      });
  });

  it("survey.delete()", async () => {
    surveys.destroy.mockReturnValueOnce(Promise.resolve(1));

    await request(app)
      .delete("/api/survey/1")
      .set("userid", 1)
      .set("token", "abcdef.ghij.klmnop")
      .expect(200)
      .expect((res) => {
        expect(res.body.msg).toEqual("survey deleted successfully");
      });
  });

  it("survey.viewallsurvey()", async () => {
    surveys.findAll.mockReturnValueOnce(Promise.resolve([{ id: 1 }]));
    await request(app)
      .get("/api/survey")
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual([{ id: 1 }]);
      });
  });

  it("survey.fechanswers()", async () => {
    surveys.findOne.mockReturnValueOnce(Promise.resolve([{ id: 1 }]));
    questions.findAll.mockReturnValueOnce(Promise.resolve(["quest1"]));

    await request(app)
      .post("/api/survey/fechanswers")
      .set("userid", 1)
      .set("token", "abcdef.ghij.klmnop")
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(["quest1"]);
      });
  });

  it("survey.view", async () => {
    surveys.findOne.mockReturnValueOnce(Promise.resolve([{ id: 1 }]));
    questions.findAll.mockReturnValueOnce(Promise.resolve(["quest1"]));

    await request(app)
      .get("/api/survey/1")
      .set("userid", 1)
      .set("token", "abcdef.ghij.klmnop")
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(["quest1"]);
      });
  });
});
