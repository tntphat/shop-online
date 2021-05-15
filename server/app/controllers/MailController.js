const Mail = require("../models/Mail");
const User = require("../models/User");

class MailController {
  //@route GET /mails/
  async getMail(req, res) {
    try {
      const mails = await Mail.find().populate({
        path: "mail_author",
        select: "_id firstName lastName email createdAt",
      });
      res.status(200).send(mails);
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ msg: "Server error" });
    }
  }

  async getUserMail(req, res) {
    try {
      const mails = await Mail.find({ mail_author: req.user._id }).populate(
        "mail_author"
      );
      res.status(200).send(mails);
    } catch (e) {
      res.status(400).send(e);
    }
  }

  async repMail(req, res) {
    try {
      const mail = await Mail.findOneAndUpdate(
        { _id: req.body.idMail },
        { reply: req.body.content },
        { new: true }
      );
      console.log(mail);
      res.status(200).send(mail);
    } catch (e) {
      res.status(400).send(e);
    }
  }

  //@route GET /mails/add
  async addMail(req, res) {
    try {
      // const data = { ...req.body, mail_author: req.user._id };
      const data = { ...req.body, mail_author: req.user._id };
      const mail = new Mail(data);
      const newMail = await mail.save();

      await User.updateOne(
        { _id: req.user._id },
        { $push: { sent_mails: { mail_id: newMail._id } } }
      );
      res.status(200).send(mail);
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ msg: "Server error" });
    }
  }
}

module.exports = new MailController();
