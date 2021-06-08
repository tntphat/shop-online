const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: { type: String },
    price: { type: Number, default: 0 },
    discount_price: { type: Number, default: 0 },
    discount_date: { type: Date },
    quantity_left: { type: Number, default: 50 },
    description: { type: String, default: "" },
    producer: { type: String, default: "" },
    purchased: { type: Number, default: 0 },
    star: { type: Number, default: 0 },
    rates: [{ type: Schema.Types.ObjectId, ref: "Rate" }],
    imgs: {
      type: String,
      default: "http://atc-home.com/images/joomlart/demo/default.jpg",
    },
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
