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
    const validPassword = bcrypt.compare(req.body.password, user.password);

    if (!validPassword)
      res.status(400).send("Incorrect Password, please try again");

    res.send(_.pick(user, ["_id", "email", "password"]));
  }
});

exports.sign_up = asyncHandler(async (req, res, next) => {
  sanitizeInput(req.body);
  const validationResult = validateNewUser(req.body);

  if (validationResult.error) {
    return res.status(400).send(validationResult.error.message);
  } else {
    const user = new User(_.pick(req.body, ["username", "email", "password"]));

    //hashing the password
    const salt = await bcrypt.genSalt(10);
    user.password = bcrypt.hash(user.password, salt);

    await user.save();
    res.send(_.pick(user, ["_id", "email", "password"]));
  }
});
