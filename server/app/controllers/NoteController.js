const Note = require("../models/Note");
const { addNewGoods } = require("./ProductController");
const ImportNote = require("../models/ImportNote");
const Product = require("../models/Product");

class NoteController {
  //@router GET /note/total-price
  async getTotalImportPrice(req, res) {
    try {
      const total_price = await Note.find().select("total_price");
      const totalImportPrice = await total_price.reduce(
        (a, b) => (a["total_price"] || 0) + (b["total_price"] || 0),
        0
      );
      res.status(200).send({ total: totalImportPrice });
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ msg: "Server Error" });
    }
  }

  //@router GET /note
  async getAll(req, res) {
    try {
      const notes = await Note.find()
        .sort("status")
        .populate("goods.product_id orderer")
        .populate({
          path: " import_notes ",
          select: "goods createdAt",
          populate: {
            path: "goods.product_id",
            select: "name",
          },
        });
      res.status(200).send(notes);
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ msg: "Server Error" });
    }
  }

  //@router GET /note/:id
  async get(req, res) {
    try {
      const note = await Note.findById(req.params.id).populate("goods.product");
      if (!note) return res.status(400).send({ msg: "Note was not existed" });
      res.status(200).send(notes);
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ msg: "Invalid note's id" });
    }
  }

  //@router PATCH /note/:id
  async editNote(req, res) {
    try {
      console.log(req.user, req.params.id, req.body);
      const importNote = new ImportNote({
        goods: req.body.dataImportNote,
        orderer: req.user._id,
        note: req.params.id,
      });
      let done = true;
      for (let i = 0; i < req.body.dataProducts.length; ++i) {
        if (req.body.dataNote[i].quantityLeft) {
          done = false;
          break;
        }
      }
      for (let i = 0; i < req.body.dataProducts.length; ++i) {
        await Product.findOneAndUpdate(
          { _id: req.body.dataImportNote[i].product_id },
          { quantity_left: req.body.dataProducts[i] }
        );
      }
      const newImportNote = await importNote.save();
      const note = await Note.findOneAndUpdate(
        { _id: req.params.id },
        {
          goods: req.body.dataNote,
          status: done,
          $push: { import_notes: newImportNote._id },
        },
        { new: true }
      );
      const dataSent = await Note.findOne({ _id: note._id })
        .populate("goods.product_id orderer")
        .populate({
          path: " import_notes ",
          select: "goods createdAt",
          populate: {
            path: "goods.product_id",
            select: "name",
          },
        });
      res.status(200).send(dataSent);
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ msg: "Server Error" });
    }
  }

  //@router POST /note/
  //@note check if editor is warehouse staff
  async addNote(req, res) {
    console.log(req.body, req.user);
    try {
      req.body.goods = req.body.goods.map((item) => ({
        ...item,
        quantityLeft: item.quantity,
      }));
      const newNote = new Note({ ...req.body, orderer: req.user._id });
      // addNewGoods(newNote.goods);
      const note = await newNote.save();
      await Note.populate(note, {
        path: "goods.product_id orderer",
      });
      res.status(200).send(note);
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ msg: "Server Error" });
    }
  }
}

module.exports = new NoteController();
