const express = require("express");
const router = express.Router();

const AuthorityController = require("../app/controllers/AuthorityController");

router.get("/", AuthorityController.getAuthorities);
router.post("/add", AuthorityController.addAuthority);

module.exports = router;
