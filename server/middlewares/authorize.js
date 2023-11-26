const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

const authorize = asyncHandler(async (req, res, next) => {
  let token;

  if (req.cookies.jwt === null) {
    return res.status(400).json({ message: "Invalid access token" });
  } else {
    try {
      //Get token from header
      token = req.cookies.jwt;
      const decoded = jwt.verify(token, process.env.ACCESS_KEY);
      if (!token) return res.status(401).json("Not Authorized!");
      //Get the user from the token
      req.user = decoded;
      next();
    } catch (err) {
      console.log(err);
      return res.status(401).json(err);
    }
  }
});

module.exports = authorize;
