const mongoose = require("mongoose");
const Joi = require("joi");
const { escape } = require("validator");

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  content: {
    type: "String",
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  recipient: Schema.Types.ObjectId,
  ref: "User",
  required: true,
});

function validateMessage(message) {
  const schema = Joi.object({
    content: Joi.string().trim().max(5000).min(1).required(),
  });

  return schema.validate(message);
}

function sanitizeMessage(message) {
  return {
    content: escape(message.content),
  };
}

const Message = mongoose.model("Message", messageSchema);

module.exports = {
  Message,
  validateMessage,
  sanitizeMessage,
};
