const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    gender: { type: String },
    username: { type: String },
    email: { type: String },
    password: { type: String },
    sent_mails: [
      {
        mail_id: { type: Schema.Types.ObjectId, ref: "Mail" },
      },
    ],
    role: { type: String, default: "0" },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", UserSchema);
