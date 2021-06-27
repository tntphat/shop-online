const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  res.send("server is running");
});

module.exports = router;
