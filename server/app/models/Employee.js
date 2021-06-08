const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema(
  {
    firstName: { type: String, default: "First" },
    lastName: { type: String, default: "Last" },
    gender: { type: String, default: "female" },
    address: { type: String, default: "/" },
    phone: { type: String, default: "0" },
    email: { type: String },
    password: { type: String, default: "admin" },
    salary: { type: Number, default: 0 },
    sent_mails: [{ type: Schema.Types.ObjectId, ref: "Mail" }],
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
