const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator'); // Importing the necessary functions from the express-validator module




// ROUTE 1: Get All the Notes: GET 'api/notes/fetchallnotes Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.send(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Interval Server Error');
  }

});

// ROUTE 2: Add Notes : POST 'api/notes/addnote'  Log in required

router.post('/addnote',
  fetchuser,
  [
    body('title', 'Title is required').isLength({ min: 3 }),
    body('description', 'Description cannot be empty').isLength({ min: 5 }),
  ], async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(400).send({ error: error });
      }

      const note = new Note({
        user: req.user.id, title, description, tag
      });
      const savedNote = await note.save();
      res.send(savedNote);

    } catch (error) {
      console.log(error.message);
      res.status(500).send('Interval Server Error');
    }


  });

module.exports = router