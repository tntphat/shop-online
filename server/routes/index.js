const userRouter = require("./user");
const productRouter = require("./product");
const mailRouter = require("./mail");
const testRouter = require("./test");
const categoryRouter = require("./category");
const subCategoryRouter = require("./subCategory");

function route(app) {
  app.use("/user", userRouter);
  app.use("/products", productRouter);
  app.use("/mails", mailRouter);
  app.use("/test", testRouter);
  app.use("/categories", categoryRouter);
  app.use("/sub-categories", subCategoryRouter);
}

module.exports = route;
