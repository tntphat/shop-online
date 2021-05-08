const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb+srv://dbUser5:dbUser5@cluster0.w7ggh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
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
