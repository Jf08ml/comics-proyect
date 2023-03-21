const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized token no exist' });
  }
  

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(err)
      return res.status(401).json({ message: 'Unauthorized error decoded' });
    }

    req.userId = decoded.id;
    next();
  });
}

module.exports = {
  verifyToken
};
