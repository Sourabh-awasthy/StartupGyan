const express = require("express");
const controller = require("../controllers/controllers");
const logSignRouter = express.Router();
const getTestsRouter = express.Router();
const adminRouter = express.Router();
const getQuestionPaper = require("../controllers/getQuestionPaper");
const postSchedule = require("../controllers/postSchedule");
const hello = (req, res) => {
  req.hello = "hiomanshu";
};
logSignRouter.route("/signup").post(controller.signUp);
logSignRouter.route("/login").post(controller.logIn);
getTestsRouter.route("/test").get(getQuestionPaper);
adminRouter.route("/postschedule").post(postSchedule);
module.exports = { logSignRouter, getTestsRouter, adminRouter };
