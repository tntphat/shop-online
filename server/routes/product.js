const express = require("express");
const router = express.Router();
const isAuth = require("../auth/authHelper");

const productController = require("../app/controllers/ProductController");

router.get("/", productController.getProduct);
router.get("/expired", productController.getExpiredProduct);
router.post("/add", productController.addProduct);
router.delete("/del", productController.dltProduct);
router.put("/edit", productController.editProduct);
router.patch("/rate/:id", isAuth, productController.rateProduct);

module.exports = router;
