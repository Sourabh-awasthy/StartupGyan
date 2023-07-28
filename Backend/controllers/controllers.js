const model = require("../Schemas/schema");
const jwt = require("jsonwebtoken");
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "secretJwt", { expiresIn: maxAge });
};
const handleError = (e) => {
  const error = { email: "", password: "", phone: "" };
  console.log(e.code);
  if (e.code == 11000) {
    // console.log(e);
    if (e.keyPattern.email) {
      error.email = "User Already Exists with this email";
    }
    if (e.keyPattern.phone) {
      error.phone = "User Already Exists with this phone";
    }
  }
  if (e.message.includes("users validation failed")) {
    // console.log(e);
    Object.values(e.errors).forEach(({ properties }) => {
      error[properties.path] = properties.message;
    });
  }
  return error;
};
module.exports.signUp = async (req, res) => {
  const { email, password, phone, name } = req.body;
  console.log(req.body)
  try {
    const user = await model.create({ email, password, phone, name });
    const token = createToken(user._id);
    // res.cookie("jwt", token, {
    //   httpOnly: true,
    //   maxAge: maxAge * 1000,
    //   path: "http://127.0.0.1:5500/Frontend",
    // });
    res.status(201).json({ user });
  } catch (e) {
    // console.log(e.message);
    const error = handleError(e);

    res.status(400).json({
      error,
    });
  }
};
module.exports.logIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const User = await model.login_check(email, password);

    // JWT tokens
    const token = createToken(User._id);
    // res.cookie("jwt", token, {
    //   httpOnly: true,
    //   maxAge: maxAge * 1000,
    //   path: "http://127.0.0.1:5500/Frontend",
    //   domain: "127.0.0.1",
    // });
    res.status(200).json({ User });
  } catch (e) {
    const errors = handleError(e);
    res.status(400).json({ errors });
  }
};
