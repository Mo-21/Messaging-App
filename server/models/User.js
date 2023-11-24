const mongoose = require("mongoose");
const Joi = require("joi");
const { escape } = require("validator");
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: "String",
    maxLength: 50,
    required: true,
    unique: true,
  },
  email: {
    type: "String",
    maxLength: 1024,
    required: true,
    unique: true,
  },
  password: {
    type: "String",
    require: true,
    maxLength: 255,
  },
  profilePic: {
    type: "String",
    required: false,
    default: "",
  },
  bio: {
    type: "String",
    maxLength: 5000,
    default: "",
  },
  isAdmin: {
    type: "Boolean",
    default: false,
  },
  refreshToken: {
    type: "String",
    default: "",
  },
});

//When Signing up
function validateNewUser(user) {
  const schema = Joi.object({
    username: Joi.string().max(50).min(5).trim().required(),
    email: Joi.string().email().max(1024).min(5).required(),
    password: Joi.string().min(5).max(255).trim().required(),
    passwordConfirmation: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .label("Password confirmation")
      .messages({ "any.only": "{{#label}} does not match the password" }),
    profilePic: Joi.string(),
    bio: Joi.string().trim().max(5000),
    isAdmin: Joi.boolean(),
  });

  return schema.validate(user);
}

//When Signing in
function validateRegisteredUser(user) {
  const schema = Joi.object({
    email: Joi.string().email().max(1024).min(5).required(),
    password: Joi.string().min(5).max(255).trim().required(),
  });

  return schema.validate(user);
}

function sanitizeInput(data) {
  return {
    email: escape(data.email),
  };
}

userSchema.methods.generateAccessToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    process.env.ACCESS_KEY,
    {
      expiresIn: "4h",
    }
  );
  return token;
};

//Refresh Token is suspended.
//The code is left here for future implementation
userSchema.methods.generateRefreshToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    process.env.REFRESH_TOKEN,
    {
      expiresIn: "1h",
    }
  );
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
  sanitizeInput,
  validateNewUser,
  validateRegisteredUser,
};
