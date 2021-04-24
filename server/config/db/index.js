const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/form_dev", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("Sucessfully Connected !!! HEHEHEHEEHE");
  } catch (error) {
    console.log("fail");
  }
}

module.exports = { connect };
