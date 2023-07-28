const mongoose = require("mongoose");

const userTests = new mongoose.Schema({
  courseName: { type: String },
  courseTests: {
    type: [
      {
        testName: { type: String },
        testResult: [
          {
            optionsChosen: [
              { optionNo: { type: Number }, isCorrect: { type: Boolean } },
            ],
            intAns: { ans: { type: String }, isCorrect: { type: Boolean } },
            timeTaken: String,
          },
        ],
        physics: {
          correctQuestions: { type: Number },
          incorrectQuestions: { type: Number },
          unattemptedQuestions: { type: Number },
        },
        chemistry: {
          correctQuestions: { type: Number },
          incorrectQuestions: { type: Number },
          unattemptedQuestions: { type: Number },
        },
        maths: {
          correctQuestions: { type: Number },
          incorrectQuestions: { type: Number },
          unattemptedQuestions: { type: Number },
        },
      },
    ],
  },
});
module.exports = userTests;
