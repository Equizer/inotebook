// Require the 'db.js' file, which likely contains the logic for connecting to MongoDB
const connectToMongo = require('./db');

// Require the 'express' module, which is a popular Node.js framework for building web applications
const express = require('express');

// we cannot make request from our frontend local host to backend endpoint in local host as it shows an error that says: "Access to fetch at 'http://localhost:5000/api/notes/addnote' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled." 
const  cors = require('cors')


// Invoke the function responsible for connecting to the MongoDB database
connectToMongo();

// Create a new Express application
const app = express();

// Set the port number for the server to listen on
const port = 5000;

// using cors 
app.use(cors());


//we included this so that we can console.log(req.body) in the auth.js we also had to add a header in the thunder client which had content-type application/json and added a object that has name in the body in the thunder client this is called a middleware 
// Middleware to parse incoming requests with JSON payloads
// It makes the request body available under req.body  
app.use(express.json());


//Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// Set up a route for handling GET requests to the root URL ('/')
// app.get('/', (req, res) => {
//   // Send a response of 'Hello Harry!' when a GET request is made to the root URL
//   res.send('Hello Harry!');
// });

// Start the Express server and listen on the specified port
app.listen(port, () => {
  // Log a message to the console indicating that the server is running
  console.log(`iNotebook Backend listening at http://localhost:${port}`);
});
