const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');



// ROUTE 1: Get All the Notes: GET 'api/notes/fetchallnotes Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  res.send(notes);
});

module.exports = router