const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    gender: { type: String, default: "female" },
    email: { type: String },
    password: { type: String, default: "admin" },
    salary: { type: Number, default: 0 },
    sent_mails: [
      {
        mail_id: { type: Schema.Types.ObjectId, ref: "Mail" },
      },
    ],
    time: [
      {
        type: Date,
      },
    ],
    authority: {
      type: Schema.Types.ObjectId,
      ref: "Authority",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Employee", EmployeeSchema);
