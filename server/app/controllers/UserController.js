const User = require("../models/User");
const jwt = require("jsonwebtoken");

class UserController {
  register = async (req, res) => {
    try {
      console.log(req.body);
      const user = new User(req.body);
      const { email } = user;
      const checkUser = await User.findOne({ email });
      if (checkUser) {
        res.status(401).send({ param: "email", msg: "used_email" });
      } else {
        const newUser = await user.save();
        console.log(newUser);
        const token = jwt.sign({ newUser }, "secret", { expiresIn: "1h" });
        const {
          _id,
          firstName,
          lastName,
          email,
          username,
          gender,
          role,
        } = user;
        console.log(token);
        res.status(200).send({
          _id,
          firstName,
          lastName,
          email,
          username,
          gender,
          role,
          token,
        });
      }
    } catch (e) {
      console.log("hereeeeeeeeeeeeeee", e);
      res.status(400).send(e);
    }
  };

  signIn = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (user) {
        const {
          _id,
          firstName,
          lastName,
          email,
          username,
          gender,
          role,
        } = user;
        const data = {
          _id,
          firstName,
          lastName,
          email,
          username,
          gender,
          role,
        };
        const token = jwt.sign(data, "secret", { expiresIn: "1h" });
        if (user.password === password) {
          res.status(200).send({ ...data, token });
        } else res.status(400).send({ param: "password", msg: "wrong pass" });
      } else res.status(400).send({ param: "email", msg: "not existed email" });
    } catch (e) {
      console.log(e);
    }
  };
}

module.exports = new UserController();
