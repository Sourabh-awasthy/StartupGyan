const jwt = require("jsonwebtoken");
const userSchema = require("../Schemas/schema");
const freeRoutes = ["/signup", "/login", "/postschedule"];
const requireAuth = (req, res, next) => {
  console.log(req.url);
  if (freeRoutes.includes(req.url)) {
    console.log("hello I am himanshu");
    return next();
  }
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "secretJwt", async (err, jwtDecoded) => {
      if (err) {
        res.status(400).json({ success: false });
      } else {
        let user = await userSchema.findById(jwtDecoded.id);
        req.user = {
          crediantials: user,
        };
        next();
      }
    });
  } else {
    res.status(400).json({ success: false });
  }
};
module.exports = requireAuth;
