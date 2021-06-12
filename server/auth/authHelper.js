const jwt = require("jsonwebtoken");
const config = require("../config/config");

const isAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const onlyToken = token.slice(7);
    jwt.verify(onlyToken, config.JWT_SECRET, (error, decode) => {
      if (error) {
        console.log("Fail verified jwt: ", error);
        return res.status(401).send({ msg: "Invalid Token" });
      }
      req.user = decode;
      next();
      return;
    });
  } else {
    console.log("Fail token from client");

    return res.status(401).send({ msg: "Token is not supplied" });
  }
};

module.exports = isAuth;
