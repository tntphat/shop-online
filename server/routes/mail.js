const express = require("express");
const isAuth = require("../auth/authHelper");
const router = express.Router();

const MailController = require("../app/controllers/MailController");

router.get("/", MailController.getMail);
router.get("/user", isAuth, MailController.getUserMail);
router.post("/add", isAuth, MailController.addMail);
router.patch("/rep", MailController.repMail);

module.exports = router;
