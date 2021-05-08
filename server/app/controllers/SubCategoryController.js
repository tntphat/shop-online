const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");

class CategoryController {
  //@route POST /sub-categories/add
  async addSubCategory(req, res) {
    try {
      const subCategory = new SubCategory(req.body);

      await subCategory.save();

      await Category.updateOne(
        { _id: req.body.category_id },
        { $push: { sub_categories: subCategory._id } }
      );

      res.status(200).send(subCategory);
    } catch (error) {
      console.error(error.message)
      res.status(500).send({ msg: 'Server error' });
    }
  }
}

module.exports = new CategoryController();
