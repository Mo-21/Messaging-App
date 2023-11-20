const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");

const authorize = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //Get token from header
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.ACCESS_KEY);

      //Get the user from the token
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json(err);
    }
  }

  if (!token) res.status(401).json("Not Authorized!");
});

module.exports = authorize;
