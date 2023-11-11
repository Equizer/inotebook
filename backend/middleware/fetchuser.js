const jwt = require('jsonwebtoken');

const JWT_SECRET = 'equizer$pro'; // Secret key for JWT signing

const fetchuser = (req, res, next) => {
  //Get the user from the jwt token and add it to req object
  const token = req.header('auth-token');

  if (!token) {
    return res.status(401).json({ error: 'Please enter a valid token' });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();

  } catch (error) {
    res.status(401).json({ error: 'Please enter a valid token' });
  }
}
module.exports = fetchuser;