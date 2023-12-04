const jwt = require("jsonwebtoken");

require("dotenv").config();

const secretKey = process.env.KUCINGKU_JWT_SECRET;

const authMiddleware = (req, res, next) => {
  const token = req.header.authorization;

  if (!token) {
    return res.status(401).json({ message: Unauthorized });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if(err){
        return res.status(401).json({ message: 'invalid token' });
    }

    req.userId =  decoded.userId;
    next();
  });
};

module.exports = secretKey;
