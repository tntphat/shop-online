const mongoose = require("mongoose");
const config = require("../config");

async function connect() {
  try {
    await mongoose.connect(config.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("Sucessfully Connected !");
  } catch (error) {
    console.log("fail connected to DB");
  }
}

module.exports = { connect };
