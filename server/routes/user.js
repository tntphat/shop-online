const express = require("express");
const router = express.Router();
const isAuth = require("../auth/authHelper");

const userController = require("../app/controllers/UserController");

router.post("/sign-in", userController.signIn);
router.post("/register", userController.register);

module.exports = router;
