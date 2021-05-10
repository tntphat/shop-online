const express = require("express");
const router = express.Router();
const isAuth = require('../auth/authHelper')

const NoteController = require('../app/controllers/NoteController')

router.get('/',NoteController.getAll);
router.get('/:id',NoteController.get);
router.post('/',NoteController.addNote);

module.exports= router;