const express = require("express");
const isAuth = require("../auth/authHelper");
const router = express.Router();

const MailController = require("../app/controllers/MailController");

router.get("/", MailController.getMail);
router.post("/add", isAuth, MailController.addMail);

module.exports = router;
