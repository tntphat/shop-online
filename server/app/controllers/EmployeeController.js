const Employee = require("../models/Employee");
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

class EmployeeController {
  //@route POST /user/register
  register = async (req, res) => {
    try {
      const kiemKhos = await Employee.find({
        authority: { $eq: req.body.authority },
      });
      const authority = await Authority.findOne({ _id: req.body.authority });
      req.body.email =
        toSlug(authority.name) +
        (kiemKhos.length + 1).toString() +
        "@gmail.com";
      const user = new Employee(req.body);
      const newEmployee = await user.save();
      const dataSent = await Employee.populate(newEmployee, {
        path: "authority",
      });
      res.status(200).send(dataSent);
    } catch (e) {
      console.log("hereeeeeeeeeeeeeee", e);
      res.status(400).send(e);
    }
  };

  //@route POST /user/sign-in
  signIn = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Employee.findOne({ email }).populate("authority");
      if (user) {
        const {
          _id,
          firstName,
          lastName,
          email,
          salary,
          phone,
          address,
          gender,
          role,
          authority,
          time,
        } = user;
        const data = {
          _id,
          firstName,
          lastName,
          email,
          phone,
          address,
          gender,
          role,
          authority,
          time,
          salary,
        };
        const token = jwt.sign(data, "secret", { expiresIn: "12h" });
        if (user.password === password) {
          res.status(200).send({ ...data, token });
        } else res.status(400).send({ param: "password", msg: "wrong pass" });
      } else res.status(400).send({ param: "email", msg: "not existed email" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ msg: "Server error" });
    }
  };

  async getEmployees(req, res) {
    try {
      console.log("fetchhhhhhhhhhh");
      const employees = await Employee.find().populate("authority");
      res.status(200).send(employees);
    } catch (e) {
      res.status(400).send(e);
    }
  }
}

module.exports = new EmployeeController();
