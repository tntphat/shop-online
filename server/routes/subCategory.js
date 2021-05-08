const express = require("express");
const router = express.Router();

const SubCategoryController = require("../app/controllers/SubCategoryController");

router.post("/add", SubCategoryController.addSubCategory);

module.exports = router;
