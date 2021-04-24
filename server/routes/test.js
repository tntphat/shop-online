const express = require("express");
const router = express.Router();
const isAuth = require("../auth/authHelper");

router.post("/", isAuth, async (req, res) => {
  try {
    console.log(req.user);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
