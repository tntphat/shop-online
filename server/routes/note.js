const express = require("express");
const router = express.Router();
const isAuth = require("../auth/authHelper");

const NoteController = require("../app/controllers/NoteController");

router.get("/", NoteController.getAll);
router.get("/total-price", NoteController.getTotalImportPrice);
router.get("/:id", NoteController.get);
router.patch("/:id", isAuth, NoteController.editNote);
router.post("/", isAuth, NoteController.addNote);

module.exports = router;
