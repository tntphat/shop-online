const jwt = require("jsonwebtoken");
const config = require("../config/config");

function hi(user) {
  const {
    _id,
    firstName,
    lastName,
    email,
    username,
    gender,
    phone,
    address,
    role,
  } = user;
  const data = {
    _id,
    firstName,
    lastName,
    email,
    username,
    phone,
    address,
    gender,
    role,
  };
  const token = jwt.sign(data, config.JWT_SECRET, { expiresIn: "12h" });
  return { ...data, token };
}

module.exports = hi;
