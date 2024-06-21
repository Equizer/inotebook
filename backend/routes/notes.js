const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser'); // importing the middleware 
const Note = require('../models/Note'); // importing the Note schema that we created
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
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------


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
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------


// ROUTE 3: Update an existing Note: PUT 'api/notes/updatenote'  Login Required

router.put('/updatenote/:id', fetchuser, async (req, res) => {
  try {
    //  using destructuring we take out title description and tag from the our request so that we can use them as title, description, tag instead of having to say title.req.body, description.req.body, tag.req.body
    const { title, description, tag } = req.body;

    // create a new note object
    let newNote = {};

    //  store the values in the new object only if the user puts something there 
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };

    // here if the tag is empty or is not empty we will store it in the newNote here we did this becuz if the user wants to remove the tag then he can go to edit and just remove it as tag is not required in the note we can not do this in the title and description as they are required that means that there is supposed to be something in the title and description, the problem here was that if the user tries to remove the tag by editing it wouldnt edit in the backend as here we were previously checking and storing the tag in the newNote only if there is something in the tag but now we are doing it in both cases if it is null or not null.  
    if (tag || !tag) { newNote.tag = tag };

    //  here we take a parameter in the http link then find that id in our mongodb database 
    let note = await Note.findById(req.params.id);

    // find the note in our database using the function .findById() where we passed the id of the note that is to be deleted which we will get from the url ( :id we will replace this with an actual id in the url then we can acces it using req.params.id becuz we named it :id in above )
    if (!note) { return res.status(400).send("Note not found!") }

    // here we compare the user that is trying to update the note is actually the owner of the note or not . Rememeber we saved the id of the user with the note so here we check if the user in the note object is same or not in the req.user.id which is the person requesting to update
    if (note.user.toString() !== req.user.id) { return res.status(401).send('Not allowed') };

    // if we get to this point that means that the note is present in our database and the user trying to update the note is the owner of it
    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });

    //  we send the note in response
    res.json({ note });

  } catch (error) {
    console.log(error.message);
    res.status(500).send('Interval Server Error');
  }
});
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------

// ROUTE 4: Delete an existing note : DELETE 'api/notes/deletenote' Login Required

router.delete('/deletenote/:id', fetchuser, async (req, res) => {
  try {

    // find the note in our database using the function .findById() where we passed the id of the note that is to be deleted which we will get from the url ( :id we will replace this with an actual id in the url then we can acces it using req.params.id becuz we named it :id in above )
    let note = await Note.findById(req.params.id);

    // if we dont find that id in our notes collection then we will return a error in response stating that the note was not found of that id
    if (!note) { return res.status(400).send('Note not found'); }

    // here we compare the user that is trying to delete the note is actually the owner of the note or not . Rememeber we saved the id of the user with the note so here we check if the user in the note object is same or not in the req.user.id which is the person requesting to delete
    if (note.user.toString() !== req.user.id) { return res.status(401).send('Not allowed'); }

    // if we get to this point that means that the note is present in our database and the user trying to delete the note is the owner of it
    note = await Note.findByIdAndDelete(req.params.id);

    //  we send a message stating that note was deleted successfully along with note in response 
    res.json({ message: "Note Deleted Succesfully!", DeletedNote: note });

  } catch (error) {
    console.log(error.message);
    res.status(500).send('Interval Server Error');
  }
});
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------

// ROUTE 5: Delete all the user notes : DELETE 'api/notes/deleteallnotes' login required

router.delete('/deleteallnotes/:userId', fetchuser, async (req, res) => {
  let success = false;
  try {
    let deleteNoteUserId = await Note.findOne({ user: req.params.userId });

    if (!deleteNoteUserId) {
      return res.status(400).json({ success: success, message: "You don't have any notes to delete" });
    }
    if (deleteNoteUserId.user.toString() !== req.params.userId) {
      return res.status(401).json({ success: success, message: "Not allowed" });
    }
    deleteNoteUserId = await Note.deleteMany({ user: req.params.userId });
    success = true;
    return res.json({ success: success, message: "All notes deleted", info: deleteNoteUserId });

  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ success: success, error: error });
  }

});

module.exports = router