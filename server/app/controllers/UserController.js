const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Authority = require("../models/Authority");

function toSlug(str) {
  // Chuyển hết sang chữ thường
  str = str.toLowerCase();

  // xóa dấu
  str = str
    .normalize("NFD") // chuyển chuỗi sang unicode tổ hợp
    .replace(/[\u0300-\u036f]/g, ""); // xóa các ký tự dấu sau khi tách tổ hợp

  // Thay ký tự đĐ
  str = str.replace(/[đĐ]/g, "d");

  // Xóa ký tự đặc biệt
  str = str.replace(/([^0-9a-z-\s])/g, "");

  // Xóa khoảng trắng thay bằng ký tự -
  str = str.replace(/(\s+)/g, "");

  // Xóa ký tự - liên tiếp
  str = str.replace(/-+/g, "-");

  // xóa phần dư - ở đầu & cuối
  str = str.replace(/^-+|-+$/g, "");

  // return
  return str;
}

class UserController {
  //@route POST /user/register 
  register = async (req, res) => {
    try {
      const user = new User(req.body);
      const { email } = user;
      if (!req.body.isNotClient) {
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
      } else {
        const kiemKhos = await User.find({
          authority: { $eq: req.body.authority },
        });
        const authority = await Authority.findOne({ _id: req.body.authority });
        req.body.email =
          toSlug(authority.name) +
          (kiemKhos.length + 1).toString() +
          "@gmail.com";
        const user = new User(req.body);
        const newUser = await user.save();
        const dataSent = await User.populate(newUser, {
          path: "authority",
        });
        res.status(200).send(dataSent);
      }
    } catch (e) {
      console.log("hereeeeeeeeeeeeeee", e);
      res.status(400).send(e);
    }
  };
  //@route POST /user/sign-in 
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
    } catch (error) {
      console.error(error.message)
      res.status(500).send({ msg: 'Server error' });
    }
  };

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
