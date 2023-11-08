//  This line imports the Express module, which allows us to create a web server and define routes for handling HTTP requests.
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const JWT_SECRET = 'equizer$pro';

//Create a User using: POST "/app/auth/createuser" doesn't require Auth (this means that the user doesnt need to be logged in to hit this endpoint btw Auth means authentication over here)
router.post('/createuser', [
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


    const salt = await bcrypt.genSalt(10);
    const securedPassword = await bcrypt.hash(req.body.password, salt);


    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: securedPassword
    })
    const data = {
      user: {
        id: user.id
      }
    };
    const authToken = jwt.sign(data, JWT_SECRET)



    // res.json({ message: "User registered!", user: user })
    res.json({ message: "User registered!", authToken })


  } catch (error) {
    console.log(error.message);
    res.status(500).send('some error occured')
  }
  // using try catch above  to  make sure if any mistakes happens or if i make any mistake in the code then i get to know the error 

  // .then(user => res.json(user))
  // .catch(err => {console.log(err)
  // res.json({error: 'Enter a unique email - User already exists', message: err.message, solution: 'Try using an email that is not registered'})});
});


module.exports = router