const mongoose = require("mongoose");
const Joi = require("joi");
const { escape } = require("validator");

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
});

function validateUser(user) {
  const schema = {
    username: Joi.string().max(50).min(5).required(),
    email: Joi.string().email().max(1024).min(5).required(),
    password: Joi.string().min(5).max(255).required(),
    profilePic: Joi.string(),
    bio: Joi.string().max(5000),
  };

  return Joi.validate(user, schema);
}

function sanitizeInput(data) {
  return {
    username: escape(data.username),
    email: escape(data.email),
    password: escape(data.password),
    profilePic: escape(data.profilePic),
    bio: escape(data.bio),
  };
}

module.exports = mongoose.model("User", userSchema);
exports.validate = validateUser;
exports.sanitize = sanitizeInput;
