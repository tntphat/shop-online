const express = require("express");
const router = express.Router();
const isAuth = require('../auth/authHelper')

const InvoiceController = require('../app/controllers/InvoiceController')

router.get('/',InvoiceController.getAll);
router.get('/activated',InvoiceController.getActivated)
router.get('/:id',InvoiceController.get);
router.post('/',isAuth,InvoiceController.addInvoice);
router.patch('/:id',InvoiceController.changeStatus);

module.exports= router;