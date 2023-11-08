// Require the 'mongoose' module, which is a popular MongoDB object modeling tool for Node.js
const mongoose = require('mongoose');

// Define an asynchronous function called 'connectToMongo' responsible for connecting to the MongoDB database
const connectToMongo = async () => {
  try {
    // Attempt to connect to the MongoDB database using the provided connection string and options
    await mongoose.connect('mongodb://127.0.0.1:27017/inotebook', {
      useNewUrlParser: true, // Specify that the MongoDB Node.js driver should use the new connection string parser
      useUnifiedTopology: true, // Specify that the MongoDB Node.js driver should use the new unified topology engine
    });
    // If the connection is successful, log a success message to the console
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    // If an error occurs during the connection attempt, log the error message to the console
    console.error('Error connecting to MongoDB:', error);
  }
};

// Export the 'connectToMongo' function so it can be imported and used in other files
module.exports = connectToMongo;
