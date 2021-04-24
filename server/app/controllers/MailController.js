const Mail = require("../models/Mail");
const User = require("../models/User");

class MailController {
  async getMail(req, res) {
    req.session.sayHi = "ILDL";
    const mails = await Mail.find().populate({
      path: "mail_author",
      select: "_id firstName lastName email createdAt",
    });
    console.log(mails);
    if (mails) res.status(200).send(mails);
    else res.status(400).send("fail");
  }

  async addMail(req, res) {
    req.body.mail_author = req.user._id;
    const mail = new Mail(req.body);
    const newMail = await mail.save();

    // const user = await User.findById(req.user._id);
    // user.sent_mails.push({ mail_id: newMail._id });
    // await user.save();
    const user = await User.updateOne(
      { _id: req.user._id },
      { $push: { sent_mails: { mail_id: newMail._id } } }
    );
    console.log(newMail);
    if (newMail && user) res.status(200).send(mail);
    else res.status(400).send("failllllllll");
  }
}

module.exports = new MailController();
