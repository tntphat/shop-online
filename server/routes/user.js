const express = require("express");
const router = express.Router();
const isAuth = require("../auth/authHelper");

const userController = require("../app/controllers/UserController");

router.post("/sign-in", userController.signIn);
router.post("/register", userController.register);
router.put("/edit", isAuth, userController.editUser);
router.get("/employees", userController.getEmployees);
router.get("/:id", userController.getInfo);

module.exports = router;
