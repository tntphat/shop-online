const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderNoteSchema = new Schema(
  {
    goods: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number },
        expiry_date: { type: Date, default: Date.now() },
      },
    ],
    note_id: { type: Schema.Types.ObjectId, ref: "Note" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Note", OrderNoteSchema);
