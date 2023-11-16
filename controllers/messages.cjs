require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.cjs");
const Message = require("../models/message.cjs");
const Chat = require("../models/chat.cjs");
//send Message
exports.sendMessage = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    const aNewMessage = {};
    aNewMessage.sender = req.user.username;
    aNewMessage.content = req.body.content;
    aNewMessage.chat = req.params.id;
    const newMessage = await Message.create(aNewMessage)
      .populate("sender")
      .populate("users");
    console.log("NEW MESSAGE", newMessage);

    res.json(newMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender")
      .populate("chat");
    if (messages) {
      res.json(messages);
    } else {
      res.json("no messages");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
