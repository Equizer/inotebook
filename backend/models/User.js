// Require the 'mongoose' module, which is a popular MongoDB object modeling tool for Node.js
const mongoose = require('mongoose');
const { Schema } = mongoose;


// Define a schema for the user data, specifying the structure of the data and its validation rules
const UserSchema = {
  name: { // Define the 'name' field as a String type that is required for all documents
    type: String,
    required: true,
  },
  email: { // Define the 'email' field as a String type that is required and must be unique for all documents
    type: String,
    required: true,
    unique: true,
  },
  password: { // Define the 'password' field as a String type that is required for all documents
    type: String,
    required: true,
  },
  date: { // Define the 'date' field as a Date type that will have a default value of the current date and time
    type: Date,
    default: Date.now,
  } 
}
//the name 'user' will likely be used as the name of the collection where the user data will be stored in the MongoDB database.
// Export the mongoose model with the name 'user' and the UserSchema defined earlier 
const User = mongoose.model('user', UserSchema);
module.exports = User;