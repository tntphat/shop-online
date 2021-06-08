const express = require("express");
const router = express.Router();
const isAuth = require("../auth/authHelper");

const EmployeeController = require("../app/controllers/EmployeeController");

router.post("/register", EmployeeController.register);
router.post("/sign-in", EmployeeController.signIn);
router.get("/", EmployeeController.getEmployees);

module.exports = router;
