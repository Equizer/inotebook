//  This line imports the Express module, which allows us to create a web server and define routes for handling HTTP requests.
const express = require('express');
const router = express.Router();  // Creating an instance of the Express router
const User = require('../models/User'); //importing the user model
const { body, validationResult } = require('express-validator'); // Importing the necessary functions from the express-validator module
const bcrypt = require('bcryptjs'); // Importing the bcryptjs module for password hashing
const jwt = require('jsonwebtoken'); // Importing the jsonwebtoken module for creating JSON web tokens
const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = 'equizer$pro'; // Secret key for JWT signing



// ROUTE 1: Create a User using: POST "/api/auth/createuser" doesn't require Auth (this means that the user doesnt need to be logged in to hit this endpoint btw Auth means authentication over here)
router.post('/createuser', [
  //validations for the schema
  body('name', 'Name must be atleast 3 characters').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {


  //  if there are erros return bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }


  try {


    // check whether a user with this email already exists
    let user = await User.findOne({ email: req.body.email })
    if (user) {
      return res.status(400).json({ error: "Sorry a user with this email already exists" })
    }

    // Generate a salt and hash the user's password
    const salt = await bcrypt.genSalt(10);
    const securedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user in the database [for more details about the .create() function refer the notes.md file]
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      //notice how we are saving the secured password in our database which is hashed using bcryptjs
      password: securedPassword
    });

    // Create a JSON web token for the user
    const data = {
      user: {
        id: user.id
      }
    };

    const authToken = jwt.sign(data, JWT_SECRET);


    // res.json({ message: "User registered!", user: user })

    // Return the registered user and the JSON web token in the response
    res.json({ message: "User registered!", authToken })


  } catch (error) {
    console.log(error.message);
    res.status(500).send('Interval Server Error')
  }
  // using try catch above  to  make sure if any mistakes happens or if i make any mistake in the code then i get to know the error 

  // .then(user => res.json(user))
  // .catch(err => {console.log(err)
  // res.json({error: 'Enter a unique email - User already exists', message: err.message, solution: 'Try using an email that is not registered'})});
});



// ROUTE 2: Authenticate a user at : POST 'api/auth/login' no login required
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be empty').exists()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.Array() });
  }
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email: email });
    if (!user) {
      res.status(400).json({ error: 'Please login with correct credentials' });
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(400).json({ error: 'Please login with correct credentials' });
    }

    const data = {
      user: {
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    res.json({ authToken });


  } catch (error) {
    console.log(error.message);
    res.status(500).send('Interval Server Error');
  }
});


// ROUTE 3: Get loggedin user's details : POST 'api/auth/getuser' login required
router.post('/getuser', fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('-password');
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Interval Server Error');
  }
});

module.exports = router