const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AuthoritySchema = new Schema({
  name: { type: String },
  role: { type: Number },
});
module.exports = mongoose.model("Authority", AuthoritySchema);
