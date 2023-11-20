const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { User } = require("../models/user");

const authorize_admin = asyncHandler(async (req, res, next) => {
  if (req.user.isAdmin !== true) return res.status(403).json("Access Denied");
  next();
});

module.exports = authorize_admin;
