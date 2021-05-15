const User = require("../models/User");
const jwtConvert = require("../../auth/jwtConvert");

class UserController {
  //@route POST /user/register
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
        const data = jwtConvert(newUser);
        res.status(200).send(data);
      }
    } catch (e) {
      res.status(400).send(e);
    }
  };
  //@route POST /user/sign-in
  signIn = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (user) {
        if (user.password === password) {
          const data = jwtConvert(user);
          res.status(200).send(data);
        } else res.status(400).send({ param: "password", msg: "wrong pass" });
      } else res.status(400).send({ param: "email", msg: "not existed email" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ msg: "Server error" });
    }
  };

  async editUser(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.user._id, req.body, {
        new: true,
      });
      const data = jwtConvert(user);
      res.status(200).send(data);
    } catch (e) {
      res.status(400).send(e);
    }
  }

  async getEmployees(req, res) {
    try {
      console.log("fetchhhhhhhhhhh");
      const employees = await User.find({
        isNotClient: { $eq: 1 },
      }).populate("authority");
      // const employees = await User.find({
      //   authority: { $ne: "609164dc6ca50e5fac5bf765" },
      // });
      // console.log(employees);
      res.status(200).send(employees);
    } catch (e) {
      res.status(400).send(e);
    }
  }
}

module.exports = new UserController();
