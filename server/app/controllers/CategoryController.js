const Category = require("../models/Category");

class CategoryController {
  async getCategory(req, res) {
    const categories = await Category.find().populate("sub_categories");
    if (categories) res.status(200).send(categories);
    else res.status(400).send("fail");
  }

  async addCategory(req, res) {
    // req.body.Category_author = req.user._id;
    try {
      const category = new Category(req.body);

      await category.save();
      res.status(200).send(category);
    } catch (e) {
      res.status(500).send(e);
    }
  }

  async editCategory(req, res) {
    try {
      const category = await Category.findOneAndUpdate(
        { _id: req.body._id },
        {
          name: req.body.name,
        },
        { new: true }
      );
      res.status(200).send(category);
    } catch (e) {
      res.status(500).send(e);
    }
  }

  async deleteCategory(req, res) {
    try {
      console.log("aaaaaa", req.body.id);
      const category = await Category.findOneAndDelete({ _id: req.body.id });
      res.status(200).send(category);
    } catch (e) {
      res.status(500).send(e);
    }
  }
}

module.exports = new CategoryController();
