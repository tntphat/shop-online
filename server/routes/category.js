const express = require("express");
const router = express.Router();

const CategoryController = require("../app/controllers/CategoryController");

router.get("/", CategoryController.getCategory);
router.post("/add", CategoryController.addCategory);
router.patch("/edit", CategoryController.editCategory);
router.delete("/delete", CategoryController.deleteCategory);

module.exports = router;
