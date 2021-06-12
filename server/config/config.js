const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  ENVIRONMENT: process.env.ENV,
  PORT: process.env.ENV === "develop" ? 5000 : 80,
  JWT_SECRET: process.env.JWT_SECRET || "secret",
  MONGODB_URL:
    process.env.MONGODB_URL ||
    "mongodb+srv://dbUser5:dbUser5@cluster0.w7ggh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
};
