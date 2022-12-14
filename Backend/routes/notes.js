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
    body("title", "Enter a Valid title").isLength({ min: 1 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 1,
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

//Route 3: Update an existing note using: PUT

router.put(
    "/updatenote/:id",
    fetchUser,
    async (req, res) => {


      try {
        
        const{title, description, tag} = req.body;

        //Create a newNote object
        const newNote = {};
        if(title){
            {newNote.title = title};
        }
        if(description){
            {newNote.description = description};
        }
        if(tag){
            {newNote.tag = tag};
        }


        //Find the note to be updated and update it

        let note = await Notes.findById(req.params.id);

        if(!note){
            res.status(404).send("Not found");
        }

        if(note.user.toString() != req.user.id){
            return res.status(401).send("Not allowed");
        }

        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});

        res.json(note);
      } catch (error) {
        console.error(error.message);
        res.status(500).send('internal server error');
        
      }

    })


    //Route 4: Delete an existing note using: DELETE

    router.delete(
      "/deletenote/:id",
      fetchUser,
      async (req, res) => {

        try {
          //Find the note to be updated and update it
  
          let note = await Notes.findById(req.params.id);
  
          if(!note){
              res.status(404).send("Not found");
          }
  
          //allow deletion only if user owns this Note
          if(note.user.toString() != req.user.id){
              return res.status(401).send("Not allowed");
          }
  
          note = await Notes.findByIdAndDelete(req.params.id);
  
          res.json({"Success": "Note has been deleted", note:note});
      
        } catch (error) {
          console.error(error.message);
          res.status(500).send('internal server error');
          
        }
  
      })

module.exports = router;
