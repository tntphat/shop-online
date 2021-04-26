const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");

mongoose.plugin(slug);

const SubCategorySchema = new Schema({
  name: { type: String },
  slug: { type: String, slug: "name", unique: true },
  category_id: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
});
module.exports = mongoose.model("SubCategory", SubCategorySchema);
