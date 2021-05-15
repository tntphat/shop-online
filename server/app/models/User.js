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
    isNotClient: { type: Number, default: 0 },
    sent_mails: [
      {
        mail_id: { type: Schema.Types.ObjectId, ref: "Mail" },
      },
    ],
    cart: [
      {
        product_id: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
      },
    ],
    invoices: [{ type: Schema.Types.ObjectId, ref: "Invoice" }],
    authority: {
      type: Schema.Types.ObjectId,
      ref: "Authority",
      default: "6092bc3f0c299a5e3838fe31",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", UserSchema);
