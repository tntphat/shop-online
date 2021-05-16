const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    gender: { type: String, default: "female" },
    email: { type: String, default: "dtkl@gmail.com" },
    password: { type: String, default: "admin" },
    isNotClient: { type: Number, default: 0 },
    invoices: [{
      invoice_id: { type: Schema.Types.ObjectId, ref: "Invoice" }
    }],
    sent_mails: [
      {
        mail_id: { type: Schema.Types.ObjectId, ref: "Mail" },
      },
    ],
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
