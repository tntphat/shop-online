const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: { type: String },
    price: { type: Number, default: 0 },
    quantity: {type: Number,default: 0},
    expiry_date: { type: Date, default: Date.now },
    category_id: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    sub_category_id: {
      type: Schema.Types.ObjectId,
      ref: "SubCategory",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Product", ProductSchema);
