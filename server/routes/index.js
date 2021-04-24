const userRouter = require("./user");
const productRouter = require("./product");
const mailRouter = require("./mail");
const testRouter = require("./test");

function route(app) {
  app.use("/user", userRouter);
  app.use("/products", productRouter);
  app.use("/mails", mailRouter);
  app.use("/test", testRouter);
}

module.exports = route;
