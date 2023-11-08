// Require the 'db.js' file, which likely contains the logic for connecting to MongoDB
const connectToMongo = require('./db');

// Require the 'express' module, which is a popular Node.js framework for building web applications
const express = require('express');

// Invoke the function responsible for connecting to the MongoDB database
connectToMongo();

// Create a new Express application
const app = express();

// Set the port number for the server to listen on
const port = 5000;

//we included this so that we can console.log(req.body) in the auth.js we also had to add a header in the thunder client which had content-type application/json and added a object that has name in the body in the thunder client this is called a middleware   
app.use(express.json());


//Available Routes

app.use('/app/auth', require('./routes/auth'));
app.use('/app/notes', require('./routes/notes'));

// Set up a route for handling GET requests to the root URL ('/')
// app.get('/', (req, res) => {
//   // Send a response of 'Hello Harry!' when a GET request is made to the root URL
//   res.send('Hello Harry!');
// });

// Start the Express server and listen on the specified port
app.listen(port, () => {
  // Log a message to the console indicating that the server is running
  console.log(`Example app listening at http://localhost:${port}`);
});
