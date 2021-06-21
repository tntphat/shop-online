const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//statuses of invoice:
// - Pending
// - Activated
// - Sending
// - Success
// - Cancelled
const InvoiceSchema = new Schema(
  {
    customer: { type: Schema.Types.ObjectId, ref: "User" },
    products: [
      {
        product_id: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
      },
    ],
    status: { type: String, default: "Pending" },
    address: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
    paid: { type: Boolean },
    total_price: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Invoice", InvoiceSchema);
