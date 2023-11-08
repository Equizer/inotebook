// Require the 'mongoose' module, which is a popular MongoDB object modeling tool for Node.js
const mongoose = require('mongoose');

// Define a schema for the notes data, specifying the structure of the data and its validation rules
const NotesSchema = {
  title: { // Define the 'title' field as a String type that is required for all documents
    type: String,
    required: true,
  },
  description: { // Define the 'description' field as a String type that is required for all documents
    type: String,
    required: true
  },
  tag: { // Define the 'tag' field as a String type that will have a default value of "General" if not provided
    type: String,
    default: "General"
  },
  date: { // Define the 'date' field as a Date type that will have a default value of the current date and time
    type: Date,
    default: Date.now,
  } 
}

// Export the mongoose model with the name 'notes' and the NotesSchema defined earlier
module.exports = mongoose.model('notes', NotesSchema);

// Return this same code but add comments that explain each and every line from top to bottom in detail
