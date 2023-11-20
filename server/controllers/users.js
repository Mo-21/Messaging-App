const asyncHandler = require("express-async-handler");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  User,
  validateNewUser,
  sanitizeInput,
  validateRegisteredUser,
} = require("../models/user");

exports.sign_in = asyncHandler(async (req, res, next) => {
  sanitizeInput(req.body);
  const validationResult = validateRegisteredUser(req.body);

  if (validationResult.error) {
    return res.status(400).send(validationResult.error.message);
  } else {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      res.status(400).send("Incorrect Email, please try a correct one");
    //checking the hashed password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      res.status(400).send("Incorrect Password, please try again");
    //generating json web token
    const accessToken = user.generateAccessToken();
    let refreshToken = user.generateRefreshToken();

    res.status(200).json({
      accessToken: accessToken,
      refreshToken: refreshToken,
      userDetails: _.pick(user, ["_id", "email", "username", "isAdmin"]),
    });
  }
});

exports.sign_up = asyncHandler(async (req, res, next) => {
  sanitizeInput(req.body);
  const validationResult = validateNewUser(req.body);

  if (validationResult.error) {
    return res.status(400).send(validationResult.error.message);
  } else {
    const user = new User(
      _.pick(req.body, ["username", "email", "password", "isAdmin"])
    );
    //generating json web token
    const accessToken = user.generateAccessToken();
    let refreshToken = user.generateRefreshToken();
    //hashing the password
    const saltForPassword = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, saltForPassword);
    await user.save();

    res.status(200).json({
      accessToken: accessToken,
      refreshToken: refreshToken,
      userDetails: _.pick(user, ["_id", "email", "username", "isAdmin"]),
    });
  }
});

exports.get_user_details = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) res.status(404).json("User not found");
    res.status(200).json("Hello There... Welcome to my profile");
  } catch (ex) {
    res.status(400).send("Something went wrong");
  }
});

exports.log_out = asyncHandler(async (req, res, next) => {
  const { refreshToken } = req.body;
  const user = users.find((u) => u.refreshToken === refreshToken);
  if (!user) {
    return res.status(400).json({ message: "Invalid refresh token" });
  }
  user.refreshToken = null;
  res.json({ message: "User logged out successfully" });
});

exports.dashboard = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) res.status(404).json("User not found");
    const accessToken = user.generateAccessToken();
    res.status(200).json("Hello There... New Access Token Issued");
  } catch (ex) {
    res.status(400).send("Something went wrong");
  }
});
