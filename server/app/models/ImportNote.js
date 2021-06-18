const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImportNoteSchema = new Schema(
  {
    goods: [
      {
        product_id: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number },
        expiry_date: { type: Date },
      },
    ],
    note: { type: Schema.Types.ObjectId, ref: "Note" },
    orderer: { type: Schema.Types.ObjectId, ref: "Employee" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ImportNote", ImportNoteSchema);
