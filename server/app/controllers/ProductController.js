const Product = require("../models/Product");
const Rate = require("../models/Rate");
const multer = require("multer");

class ProductController {
  //@route GET /products/
  async getProduct(req, res) {
    try {
      const products = await Product.find()
        .populate("sub_category_id category_id ")
        .populate({
          path: "rates",
          select: "user detail star createdAt",
          populate: { path: "user", select: "firstName lastName" },
        });
      if (process.env.ENV !== "develop") {
        products.map((product) => ({
          ...product,
          imgs: product.imgs.replace(
            "http://localhost:5000",
            "https://shop-onl-tntp.herokuapp.com"
          ),
        }));
      }
      res.status(200).send(products);
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ msg: "Server error" });
    }
  }

  //@route GET /products/expired
  async getExpiredProduct(req, res) {
    try {
      const products = await Product.find({
        expiry_date: { $lte: Date.now() },
      }).populate("sub_category_id category_id");
      res.status(200).send(products);
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ msg: "Server error" });
    }
  }

  //@route POST /products/add
  async addProduct(req, res) {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "./public/images/");
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname);
      },
    });
    const upload = multer({ storage });
    try {
      upload.single("file", 1)(req, res, async function (err) {
        const data = req.body;
        const product = new Product({
          ...data,
          imgs: "http://localhost:5000/public/images/" + req.file.originalname,
        });
        const { name } = product;
        const checkProduct = await Product.findOne({ name });
        if (checkProduct) {
          return res.status(401).send({ param: "name", msg: "used_name" });
        }
        const newProduct = await product.save();
        const dataSent = await Product.populate(newProduct, {
          path: "category_id sub_category_id",
        });
        if (process.env.ENV !== "develop") {
          dataSent.imgs = dataSent.imgs.replace(
            "http://localhost:5000",
            "https://shop-onl-tntp.herokuapp.com"
          );
        }
        res.status(200).send(dataSent);
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ msg: "Server error" });
    }
  }

  //@route DELETE /products/del
  async dltProduct(req, res) {
    try {
      const { ids } = req.body;
      ids.forEach(async (id) => {
        const del = await Product.deleteOne({ _id: id });
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ msg: "Server error" });
    }
  }

  //@route PATCH /products/edit
  async editProduct(req, res) {
    try {
      const {
        data: { _id, ...others },
      } = req.body;
      await Product.updateOne({ _id: _id }, others);
      res.status(200).send();
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ msg: "Server error" });
    }
  }

  async rateProduct(req, res) {
    try {
      console.log(req.body, req.params.id, req.user._id);
      const { starProduct, ratesLength, ...rest } = req.body;
      const rate = new Rate({
        ...rest,
        user: req.user._id,
        product: req.params.id,
      });
      const newRate = await rate.save();

      console.log();

      const newProduct = await Product.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: { rates: newRate._id },
          star: (starProduct * ratesLength + newRate.star) / (ratesLength + 1),
        },
        { new: true }
      );

      const dataSent = await Product.populate(newProduct, {
        path: "rates",
        select: "user detail star createdAt",
        populate: { path: "user", select: "firstName lastName" },
      });
      if (process.env.ENV !== "develop") {
        dataSent.imgs = dataSent.imgs.replace(
          "http://localhost:5000",
          "https://shop-onl-tntp.herokuapp.com"
        );
      }
      res.status(200).send(dataSent);
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ msg: "Server error" });
    }
  }

  async addNewGoods(goods) {
    try {
      const goodIds = goods.map((good) => good.product);
      //await Product.updateMany({_id:{$in: goodIds}},{$inc :{'quantity':goods[_id]}});
      goodIds.forEach(async (id, idx) => {
        await Product.updateOne(
          { _id: id },
          { $inc: { quantity: goods[idx].quantity } }
        );
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ msg: "Server error" });
    }
  }
}

module.exports = new ProductController();
