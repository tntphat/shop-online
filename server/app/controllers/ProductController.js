const Product = require("../models/Product");

class ProductController {
  //@route GET /products/
  async getProduct(req, res) {
    try {
      const products = await Product.find().populate(
        "sub_category_id category_id"
      );
      res.status(200).send(products);
    } catch (error) {
      console.error(error.message)
      res.status(500).send({ msg: 'Server error' });
    }
  }

  //@route POST /products/add
  async addProduct(req, res) {
    try {
      const data = req.body;
      const product = new Product(data);
      const { name } = product;
      const checkProduct = await Product.findOne({ name });
      if (checkProduct) {
        return res.status(401).send({ param: "name", msg: "used_name" });
      }
      const newProduct = await product.save();
      const dataSent = await Product.populate(newProduct, {
        path: "category_id sub_category_id",
      });
      res.status(200).send(dataSent);
    } catch (error) {
      console.error(error.message)
      res.status(500).send({ msg: 'Server error' });
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
        console.error(error.message)
        res.status(500).send({ msg: 'Server error' });
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
      console.error(error.message)
      res.status(500).send({ msg: 'Server error' });
    }
  }

  async addNewGoods(goods) {
    try {
      const goodIds = goods.map(good=>good.product);
      //await Product.updateMany({_id:{$in: goodIds}},{$inc :{'quantity':goods[_id]}});
      goodIds.forEach(async(id,idx)=>{
        await Product.updateOne({_id:id},{$inc :{quantity:goods[idx].quantity}});
      })
    } catch (error) {
      console.error(error.message)
      res.status(500).send({ msg: 'Server error' });
    }
  }
}

module.exports = new ProductController();
