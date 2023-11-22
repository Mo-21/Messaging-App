const asyncHandler = require("express-async-handler");
const _ = require("lodash");

const {
  Message,
  sanitizeMessage,
  validateMessage,
} = require("../models/Message");
const { User } = require("../models/User");
const e = require("express");

exports.get_dashboard = asyncHandler(async (req, res) => {});

exports.get_chat = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { author: req.params.id, recipient: req.user._id },
        { author: req.user._id, recipient: req.params.id },
      ],
    }).sort({ date: 1 });

    if (!messages) res.status(404).json("No Messages");

    if (messages) res.json(messages);
  } catch (error) {
    throw new Error(error);
  }
});

exports.post_chat = asyncHandler(async (req, res) => {
  sanitizeMessage(req.body);
  const validationResult = validateMessage(req.body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.message);
  } else {
    const message = new Message({
      content: req.body.content,
      author: req.user._id,
      recipient: req.params.id,
      date: Date.now(),
    });

    await message.save();
    res.status(200).json(message);
  }
});
