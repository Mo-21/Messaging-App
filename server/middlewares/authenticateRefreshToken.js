//Refresh Token is suspended.
//The code is left here for future implementation

const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const { User } = require("../models/User");

const authenticate_refresh_token = asyncHandler(async (req, res, next) => {
  try {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken)
      return res.status(401).json("Not Authorized! No Refresh Token");
    const checkRefreshToken = jwt.verify(
      req.body.refreshToken,
      process.env.REFRESH_TOKEN
    );
    next();
  } catch (err) {
    res.status(401).json(err);
  }
});

module.exports = authenticate_refresh_token;
