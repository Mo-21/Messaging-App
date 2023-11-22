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
  recipient: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: "Date",
    default: Date.now(),
  },
});

messageSchema.virtual("url").get(function () {
  return `${this.id}`;
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
