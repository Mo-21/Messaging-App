const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const { User } = require("../models/user");

const authenticate_refresh_token = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findOne({
      refreshToken: req.body.refreshToken,
    });
    if (!user) return res.status(401).json("Not Authorized! No Refresh Token");
    const checkRefreshToken = jwt.verify(
      req.body.refreshToken,
      process.env.REFRESH_TOKEN
    );
    console.log(checkRefreshToken);
    next();
  } catch (err) {
    res.status(401).json(err);
  }
});

module.exports = authenticate_refresh_token;
