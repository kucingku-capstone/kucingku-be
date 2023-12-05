const jwt = require("jsonwebtoken");

require("dotenv").config();

const secretKey = process.env.KUCINGKU_JWT_SECRET;

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) return res.status(401).json({ message: 'Unauthorized Token' });

  const authSplit = token.split(' ');

  const [authType, authToken] =[
    authSplit[0],
    authSplit[1]
  ]

  if(authType !== 'Bearer') return res.status(401).json({ message: 'Unauthorized Auth Type' });

  jwt.verify(authToken, secretKey, (err, decoded) => {
    if(err){
        return res.status(401).json({ message: 'invalid token' });
    }

    req.userId =  decoded.userId;
    next();
  });
};

module.exports = authMiddleware;
