const userRouter = require("./user");
const productRouter = require("./product");
const mailRouter = require("./mail");
const authorityRouter = require("./authority");
const testRouter = require("./test");
const categoryRouter = require("./category");
const subCategoryRouter = require("./subCategory");
const invoiceRouter = require('./invoice')

function route(app) {
  app.use("/user", userRouter);
  app.use("/products", productRouter);
  app.use("/mails", mailRouter);
  app.use("/test", testRouter);
  app.use("/categories", categoryRouter);
  app.use("/authorities", authorityRouter);
  app.use("/sub-categories", subCategoryRouter);
  app.use("/invoice", invoiceRouter);
}

module.exports = route;
