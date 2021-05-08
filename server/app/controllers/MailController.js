const Mail = require("../models/Mail");
const User = require("../models/User");

class MailController {
  //@route GET /mails/
  async getMail(req, res) {
    try {

      req.session.sayHi = "ILDL";
      const mails = await Mail.find().populate({
        path: "mail_author",
        select: "_id firstName lastName email createdAt",
      });
      res.status(200).send(mails)
    } catch (error) {
      console.error(error.message)
      res.status(500).send({ msg: 'Server error' });
    }
  }

  //@route GET /mails/add
  async addMail(req, res) {
    try {
      const data = { ...req.body, mail_author: req.user._id };
      console.log(data)
      const mail = new Mail(data);
      const newMail = await mail.save();

      const user = await User.updateOne(
        { _id: req.user._id },
        { $push: { sent_mails: { mail_id: newMail._id } } }
      );
      res.status(200).send(mail);
    } catch (error) {
      console.error(error.message)
      res.status(500).send({ msg: 'Server error' });
    }
  }
}

module.exports = new MailController();
