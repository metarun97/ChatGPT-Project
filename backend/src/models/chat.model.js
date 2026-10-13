const mongoose = require("mongoose");


/* Chat schema created */
const chatSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  lastActivity: {
    type: Date,
    default: Date.now,
  }

}, { timestamps: true });


/* Chat model created */
const chatModel = mongoose.model("chat", chatSchema);

module.exports = chatModel;


