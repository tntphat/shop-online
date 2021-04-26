const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");

class CategoryController {
  // async getCategory(req, res) {
  //   const categories = await Category.find().populate({
  //     path: "sub_categories",
  //     select: "_id name",
  //   });
  //   console.log(categories);
  //   if (categories) res.status(200).send(categories);
  //   else res.status(400).send("fail");
  // }

  async addCategory(req, res) {
    // req.body.Category_author = req.user._id;
    try {
      const subCategory = new SubCategory(req.body);

      await subCategory.save();

      await Category.updateOne(
        { _id: req.body.category_id },
        { $push: { sub_categories: { sub_id: subCategory._id } } }
      );

      res.status(200).send(subCategory);
    } catch (e) {
      res.status(500).send(e);
    }
  }
}

module.exports = new CategoryController();
