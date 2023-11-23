const jwt = require('jsonwebtoken');

const JWT_SECRET = 'equizer$pro'; // Secret key for JWT signing

const fetchuser = (req, res, next) => {
  //Get the user from the jwt token and add it to req object
  const token = req.header('auth-token');


  // if the token is empty then return a error in response 
  if (!token) {
    return res.status(401).json({ error: 'Please enter a valid token' });
  }

  try {

    // if there is a token then we will verify if that token is legit and not tampered or wrong using the .verify()
    const data = jwt.verify(token, JWT_SECRET);

    // here we store the data.user in req.user (data.user contains a object that has the id of the user so now we can use req.user.id to get the user's id wherever this middleware is used)
    req.user = data.user;

    //  This is a callback function provided by Express. When called, it passes control to the next middleware function in the chain. It's important for the middleware to call next() after its work is done to proceed with the next steps in the request-response cycle.
    next();

  } catch (error) {
    res.status(401).json({ error: 'Please enter a valid token1' });
  }
}
module.exports = fetchuser;