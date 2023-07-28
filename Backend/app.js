const express = require("express");
const scheduleTests = require("./controllers/scheduleTest");
const mongoose = require("mongoose");
const router = require("./Routes/routes");
const cookieParser = require("cookie-parser");
// const hasCourses = require("./AuthMiddlewares/authMiddleware");
const cors = require("cors");
const requireAuth = require("./AuthMiddlewares/authMiddleware");
// mongoURI = "mongodb://localhost:27017/education";

const mongo = async () => {
  try {
    // mongoose.connect(mongoURI);

    const db = await mongoose.connect(
      "mongodb+srv://kartik:kartik%40123@cluster0.2iakz8l.mongodb.net/BetterBrains"
    );
    scheduleTests();
    // console.log(db.Collection);
  } catch (e) {
    console.log(e);
  }
};
mongo();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(requireAuth);
app.listen(3001, () => {
  console.log("server");
});
app.use(router.logSignRouter);
app.use(router.getTestsRouter);
app.use(router.adminRouter);
app.post("/data", async (req, res) => {
  const { question, answer, options } = req.body;
  const a = await TestSchema.create({ question, answer, options });
  console.log(a);
  if (a) res.json({ success: true });
  else {
    res.json({ success: false });
  }
});
app.get("/", (req, res) => {
  res.json({
    welcome: "Welcome to home",
    success: true,
    user: {
      name: req.user.crediantials.name,
      boughtCourses: req.user.crediantials.boughtCourses,
      testLive: req.user.crediantials.testLive,
    },
  });
});
// app.get("/test", (req, res) => {
//   console.log(req.query);
// });

// -------------------------------MIDDLEWARE FOR EXAM ROUTES------------------
// app.use("/prarambh1", requireAuth, check);
