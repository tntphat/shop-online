const userRouter = require("./user");
const productRouter = require("./product");
const mailRouter = require("./mail");
const authorityRouter = require("./authority");
const categoryRouter = require("./category");
const subCategoryRouter = require("./subCategory");
const invoiceRouter = require("./invoice");
const noteRouter = require("./note");
const employeeRouter = require("./employee");

function route(app) {
  app.use("/user", userRouter);
  app.use("/products", productRouter);
  app.use("/mails", mailRouter);
  app.use("/categories", categoryRouter);
  app.use("/authorities", authorityRouter);
  app.use("/sub-categories", subCategoryRouter);
  app.use("/invoice", invoiceRouter);
  app.use("/note", noteRouter);
  app.use("/employee", employeeRouter);
}

module.exports = route;
