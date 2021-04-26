const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");

mongoose.plugin(slug);

const CategorySchema = new Schema({
  name: { type: String },
  slug: { type: String, slug: "name", unique: true },
  sub_categories: [
    {
      sub_id: { type: Schema.Types.ObjectId, ref: "SubCategory" },
    },
  ],
});
module.exports = mongoose.model("Category", CategorySchema);
