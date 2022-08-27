const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//Route 1: Get all the notes: GET
router.get("/fetchallnotes", fetchUser, async (req, res) => {

    try {

        const notes = await Notes.find({ user: req.user.id });

        res.json(notes);        
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send('internal server error');
    }

});

//Route 2: Add a new note using: POST
router.post(
  "/addnote",
  fetchUser,
  [
    body("title", "Enter a Valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();
      res.send(savedNote)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('internal server error');
    }
  }
);

module.exports = router;
