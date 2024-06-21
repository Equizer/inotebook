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
  body('dob', 'Enter your date of birth'),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {

  //here we are making a boolean and we make it false whenever there are any errors and we are returning negative status and when the user does everything properly acc to our code then we will make it true . this will help us in the frontend as we send this bool in our response as well so we can decide whether to redirect and give access to the application or give them a error  
  let success = false;
  //  if there are erros return bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    success = false;
    return res.status(400).json({ success, errors: errors.array() });
  }


  try {
    // check whether a user with this email already exists
    let user = await User.findOne({ email: req.body.email })
    if (user) {
      success = false;
      return res.status(400).json({ success, error: "Sorry a user with this email already exists" })
    }

    // Generate a salt and hash the user's password
    const salt = await bcrypt.genSalt(10);
    const securedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user in the database [for more details about the .create() function refer the notes.md file]
    user = await User.create({
      name: req.body.name,
      dob: req.body.dob,
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

    success = true;

    // Return the registered user and the JSON web token in the response
   return res.json({ success, message: "User registered!", authToken });


  } catch (error) {
    success = false;
    console.log(error.message);
    res.status(500).json({ success, error: 'Interval Server Error' });
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

  //here we are making a boolean and we make it false whenever there are any errors and we are returning negative status and when the user does everything properly acc to our code then we will make it true . this will help us in the frontend as we send this bool in our response as well so we can decide whether to redirect and give access to the application or give them a error  
  let success = false;


  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email: email });
    if (!user) {
      success = false;
      return res.status(400).json({ success, error: 'User not found!' });
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      success = false;
      return res.status(400).json({ success, error: 'Please login with correct credentials' });
    }

    const data = {
      user: {
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    success = true;
    return res.json({ success, authToken });
  } catch (error) {
    success = false;
    console.log(error.message);
    return res.status(500).json({ success, error: 'Interval Server Error' });
  }
});


// ROUTE 3: Get loggedin user's details : GET 'api/auth/getuser' login required
router.get('/getuser', fetchuser, async (req, res) => {

  let success = false;

  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('-password');
    success = true;
    return res.send(user);
  } catch (error) {
    success = false;
    console.log(error.message);
    res.status(500).json({ success: success, error: "Interval Server Error" });
  }
});

//ROUTE 4: Delete a user : DELETE 'api/auth/deleteuser' login required

router.delete('/deleteuser/:id', fetchuser, async (req, res) => {
  let success = false;
  try {
    let userToDelete = await User.findById(req.params.id);

    if (!userToDelete || userToDelete === null || userToDelete === undefined) {
      return res.status(400).json({ success: success, message: "User not found" });
    }

    if (userToDelete._id.toString() !== req.params.id) { return status(401).json({ success: success, error: "Not allowed!" }) }

    userToDelete = await User.findByIdAndDelete(req.params.id);
    success = true;

    return res.json({ success: success, message: "User Deleted Successfuly!", deletedUser: userToDelete });

  } catch(error) {
    success = false;
    console.log(error.message)
    return res.status(401).json({ success: success, error: "Interval Server Error!" });
  }
});

module.exports = router