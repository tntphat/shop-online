const Invoice = require('../models/Invoice');

const statuses = ['Pending', 'Activated', 'Sending', 'Success', 'Cancelled']

class InvoiceController {
    //@router GET /invoice/:id
    //@note only for shipper, admin
    async get(req, res) {
        try {
            const invoice = await Invoice.findOne({ _id: req.params.id }).populate({
                path: 'customer',
                select: 'firstName lastName email'
            })
                .populate({
                    path: 'products.product_id',
                    select: 'name price'
                });
            if (!invoice)
                return res.status(400).send({ msg: 'Wrong invoice\'s id' });
            res.status(200).send(invoice);
        } catch (error) {
            console.error(error.message);
            res.status(500).send({ msg: 'Invalid invoice\'s id' });
        }
    }

    //@router GET /invoice
    //@note only for admin
    async getAll(req, res) {
        try {
            const invoices = await Invoice.find().populate({
                path: 'customer',
                select: 'firstName lastName email'
            })
                .populate({
                    path: 'products.product_id',
                    select: 'name price'
                });
            res.status(200).send(invoices);
        } catch (error) {
            console.error(error.message)
            res.status(500).send({ msg: 'Server error' });
        }
    }

    //@router GET /invoice/activated
    //@desc get invoices whose status is 'activated' (invoices need to be delivered)
    async getActivated(req, res) {
        try {
            const invoices = await Invoice.find({ status: 'Activated' }).populate({
                path: 'customer',
                select: 'firstName lastName email'
            })
                .populate({
                    path: 'products.product_id',
                    select: 'name price'
                });
            res.status(200).send(invoices);
        } catch (error) {
            console.error(error.message);
            res.status(500).send({ msg: 'Server error' });
        }
    }

    //@router POST /invoice
    async addInvoice(req, res) {
        try {
            const newInvoice = new Invoice(req.body);
            //@note check if customer has paid yet

            const invoice = await newInvoice.save();
            res.status(200).send(invoice);
        } catch (error) {
            console.error(error.message);
            res.status(500).send({ msg: 'Server error' });
        }
    }

    //@route PATCH /invoice/:id
    async changeStatus(req, res) {
        try {
            const { status   } = req.body;
            if (!statuses.some(stt => stt === status))
                return res.status(400).send({ error: 'Invalid status' })

            if (status === 'Cancelled') {
                await Invoice.updateOne({ _id: req.params.id },{status,can_reason: req.body.reason},{strict: false});
                return res.status(200).send({ msg: 'Invoice cancelled' });
            }
            await Invoice.updateOne({ _id: req.params.id }, {status});
            res.status(200).send({ msg: 'Invoice\'s status changed' });
        } catch (error) {
            console.error(error.message);
            res.status(500).send({ msg: 'Server error' });
        }
    }
}

module.exports = new InvoiceController()