const Category = require("../models/Category");

class CategoryController {
  //@route GET /categories/ 
  async getCategory(req, res) {
    try {
      const categories = await Category.find().populate("sub_categories");
      res.status(200).send(categories);
    } catch (error) {
      console.error(error.message)
      res.status(500).send({ msg: 'Server error' });
    }
  }

  //@route POST /categories/add
  async addCategory(req, res) {
    try {
      const category = new Category(req.body);
      await category.save();
      res.status(200).send(category);
    } catch (error) {
      console.error(error.message)
      res.status(500).send({ msg: 'Server error' });
    }
  }

  //@route PATCH /categories/edit
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
    } catch (error) {
      console.error(error.message)
      res.status(500).send({ msg: 'Server error' });
    }
  }
  
   //@route DELETE /categories/edit
  async deleteCategory(req, res) {
    try {
      console.log("aaaaaa", req.body.id);
      const category = await Category.findOneAndDelete({ _id: req.body.id });
      res.status(200).send(category);
    } catch (error) {
      console.error(error.message)
      res.status(500).send({ msg: 'Server error' });
    }
  }
}

module.exports = new CategoryController();
