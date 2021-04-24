const Product = require("../models/Product");

class ProductController {
  async getProduct(req, res) {
    const products = await Product.find();
    // console.log(products);
    console.log("TEST SESSION", req.session);
    if (products) res.status(200).send(products);
    else res.status(400).send("fail");
  }

  async addProduct(req, res) {
    const data = req.body;
    const product = new Product(data);
    const { name } = product;
    const checkProduct = await Product.findOne({ name });
    if (checkProduct) {
      console.log(checkProduct);
      res.status(401).send({ param: "name", msg: "used_name" });
    } else {
      const newProduct = await product.save();

      if (newProduct) res.status(200).send(product);
      else res.status(400).send("failllllllll");
    }
  }
  async dltProduct(req, res) {
    const { ids } = req.body;
    const flag = true;
    ids.forEach(async (id) => {
      const del = await Product.deleteOne({ _id: id });
      if (!del) flag = false;
    });
    flag ? res.status(200).send("ok") : res.status(400).send(" not ok");
  }

  async editProduct(req, res) {
    try {
      const {
        data: { _id, ...others },
      } = req.body;
      await Product.updateOne({ _id: _id }, others);
      // if(updateProduct)
      res.status(200).send();
    } catch (err) {
      res.status(400).send(err);
    }
  }
}

module.exports = new ProductController();
