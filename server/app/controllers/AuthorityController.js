const Authority = require("../models/Authority");

class MailController {
  async getAuthorities(req, res) {
    const authorities = await Authority.find();
    if (authorities) res.status(200).send(authorities);
    else res.status(400).send("fail");
  }

  async addAuthority(req, res) {
    const authority = new Authority(req.body);
    const newAuthority = await authority.save();

    if (newAuthority) res.status(200).send(authority);
    else res.status(400).send("failllllllll");
  }
}

module.exports = new MailController();
