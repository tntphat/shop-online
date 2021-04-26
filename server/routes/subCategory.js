const express = require("express");
const router = express.Router();

const SubCategoryController = require("../app/controllers/SubCategoryController");

// router.get("/", SubCategoryController.getCategory);
router.post("/add", SubCategoryController.addCategory);

module.exports = router;
