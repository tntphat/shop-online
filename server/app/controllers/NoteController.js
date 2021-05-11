const Note = require('../models/Note');
const {addNewGoods} = require('./ProductController')

class NoteController {
    //@router GET /note/total-price
    async getTotalImportPrice(req,res) {
        try {
            const total_price = await Note.find().select('total_price');
            const totalImportPrice = await total_price.reduce((a,b) => (a['total_price'] || 0)+(b['total_price'] || 0),0);
            res.status(200).send({total:totalImportPrice});
        } catch (error) {
            console.error(error.message);
            res.status(500).send({ msg: 'Server Error' });
        }
    }

    //@router GET /note
    async getAll(req,res) {
        try {
            const notes = await Note.find().populate('goods.product');
            res.status(200).send(notes);
        } catch (error) {
            console.error(error.message);
            res.status(500).send({ msg: 'Server Error' });
        }
    }

    //@router GET /note/:id
    async get(req,res) {
        try {
            const note = await Note.findById(req.params.id).populate('goods.product');
            if (!note)
                return res.status(400).send({ msg: 'Note was not existed' });
            res.status(200).send(notes);
        } catch (error) {
            console.error(error.message);
            res.status(500).send({ msg: 'Invalid note\'s id' });
        }
    }

    //@router PATCH /note/:id
    async editNote(req,res) {
        try {
            await Note.UpdateOne({_id: req.params.id},{...req.body});
            res.status(200).send({msg: 'Note has been saved'});
        } catch (error) {
            console.error(error.message);
            res.status(500).send({ msg: 'Server Error' });
        }
    }

    //@router POST /note/
    //@note check if editor is warehouse staff
    async addNote(req,res) {
        try {
            const newNote = new Note(req.body);
            addNewGoods(newNote.goods);
            const note = await newNote.save();
            res.status(200).send(note);
        } catch (error) {
            console.error(error.message);
            res.status(500).send({ msg: 'Server Error' });
        }
    }
}

module.exports= new NoteController();