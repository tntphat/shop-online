const Invoice = require("../models/Invoice");
const User = require("../models/User");
const Product = require("../models/Product");
const { appendInvoice } = require("./UserController");

const statuses = ["Pending", "Activated", "Sending", "Success", "Cancelled"];

class InvoiceController {
  //@router GET /invoice/:id
  //@note only for shipper, admin
  async get(req, res) {
    try {
      const invoice = await Invoice.findOne({ _id: req.params.id })
        .populate({
          path: "customer",
          select: "firstName lastName email",
        })
        .populate({
          path: "products.product_id",
          select: "name price",
        });
      if (!invoice) return res.status(400).send({ msg: "Wrong invoice's id" });
      res.status(200).send(invoice);
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ msg: "Invalid invoice's id" });
    }
  }

  //@router GET /invoice
  //@note only for admin
  async getAll(req, res) {
    try {
      const invoices = await Invoice.find()
        .populate({
          path: "customer",
          select: "firstName lastName email",
        })
        .populate({
          path: "products.product_id",
          select: "name price",
        });
      res.status(200).send(invoices);
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ msg: "Server error" });
    }
  }

  //@router GET /invoice/activated
  //@desc get invoices whose status is 'activated' (invoices need to be delivered)
  async getActivated(req, res) {
    try {
      const invoices = await Invoice.find({ status: "Activated" })
        .populate({
          path: "customer",
          select: "firstName lastName email",
        })
        .populate({
          path: "products.product_id",
          select: "name price",
        });
      res.status(200).send(invoices);
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ msg: "Server error" });
    }
  }

  //@router POST /invoice
  async addInvoice(req, res) {
    try {
      console.log(req.body.productsPurchased);

      const newInvoice = new Invoice({
        ...req.body,
        address: req.user.address,
        customer: req.user._id,
      });

      const invoice = await newInvoice.save();

      const idArr = req.body.products.map((prod) => prod.product_id);

      for (let i = 0; i < idArr.length; ++i) {
        await Product.updateOne(
          { _id: idArr[i] },
          {
            quantity_left:
              req.body.productsQuantityLeft[i] - req.body.products[i].quantity,
            purchased:
              req.body.productsPurchased[i] + req.body.products[i].quantity,
          }
        );
      }
      await User.updateOne(
        { _id: req.user._id },
        { $push: { invoices: invoice._id } }
      );

      const dataSent = await Invoice.populate(invoice, {
        path: "product_id",
      });
      res.status(200).send(dataSent);
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ msg: "Server error" });
    }
  }

  //@route PATCH /invoice/:id
  async changeStatus(req, res) {
    try {
      const { status } = req.body;
      if (!statuses.some((stt) => stt === status))
        return res.status(400).send({ error: "Invalid status" });

      if (status === "Cancelled") {
        await Invoice.updateOne(
          { _id: req.params.id },
          { status, can_reason: req.body.reason },
          { strict: false }
        );
        return res.status(200).send({ msg: "Invoice cancelled" });
      }
      await Invoice.updateOne({ _id: req.params.id }, { status });
      res.status(200).send({ msg: "Invoice's status changed" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ msg: "Server error" });
    }
  }
}

module.exports = new InvoiceController();
