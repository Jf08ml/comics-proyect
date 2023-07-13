const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) {
    console.log('No token');
    return res.status(401).json({ message: 'Unauthorized token does not exist' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ result: err.name, message: 'Token has expired' });
      }
      return res.status(401).json({ result: err.name, message: 'Unauthorized error decoded' });
    }

    req.userId = decoded.id;
    next();
  });
}

module.exports = {
  verifyToken
};
