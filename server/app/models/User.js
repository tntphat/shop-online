const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    gender: { type: String, default: "female" },
    email: { type: String, default: "dtkl@gmail.com" },
    password: { type: String, default: "admin" },
    address: { type: String, default: "0/0" },
    phone: { type: String, default: "090" },
    invoices: [{ type: Schema.Types.ObjectId, ref: "Invoice" }],
    sent_mails: [{ type: Schema.Types.ObjectId, ref: "Mail" }],
    cart: [
      {
        product_id: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
      },
    ],
    invoices: [{ type: Schema.Types.ObjectId, ref: "Invoice" }],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", UserSchema);
