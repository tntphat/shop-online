const jwt = require("jsonwebtoken");

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
  const token = jwt.sign(data, "secret", { expiresIn: "12h" });
  return { ...data, token };
}

module.exports = hi;
