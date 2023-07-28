const qpSchema = require("../Schemas/questionPaper");
const mongoose = require("mongoose");
const getQp = async (req, res) => {
  const { course, test } = req.query;
  const boughtCourses = req.user.crediantials.boughtCourses;
  console.log(req.user.crediantials.testLive);
  const isTestLive = () => {
    const liveTests = req.user.crediantials.testLive;
    if (!liveTests) {
      return false;
    }
    for (let i = 0; i < liveTests.length; i++)
      if (liveTests[i].course === course && liveTests[i].test === test) {
        console.log("fuck u");
        return true;
      }
    return false;
  };
  if (boughtCourses.includes(course)) {
    console.log("is test libe= " + isTestLive());
    if (isTestLive()) {
      const myCourse = mongoose.model(course, qpSchema);

      let crudeQp = await myCourse.findOne({ name: test });
      if (!crudeQp)
        return res.json({ success: false, message: "no such test" });
      crudeQp = crudeQp.questionPaper;
      const fineQp = [];
      crudeQp.forEach(({ question, qDiag, options }) => {
        const finalQuestion = {
          question,
          qDiag,
          options,
        };
        fineQp.push(finalQuestion);
      });
      res.json({ success: true, name: test, questionPaper: fineQp });
    } else res.json({ success: false, message: "testnotlive" });
  } else res.json({ success: false, message: "buy the course first" });
};
module.exports = getQp;

// Tests
