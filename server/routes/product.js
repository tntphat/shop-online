const express = require("express");
const router = express.Router();

const productController = require("../app/controllers/ProductController");

router.get("/", productController.getProduct);
router.post("/add", productController.addProduct);
router.delete("/del", productController.dltProduct);
router.put("/edit", productController.editProduct);

module.exports = router;
