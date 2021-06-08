const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RateSchema = new Schema(
  {
    star: { type: Number },
    detail: { type: String },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Rate", RateSchema);
