const mongoose = require("mongoose");


/* User schema created */
const userSchema = new mongoose.Schema({

  email: {
    type: String,
    required: true,
    unique: true
  },

  fullName: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },

  password: {
    type: String,
  },

}, { timestamps: true });


/* User model created */
const userModel = mongoose.model("user",userSchema);


module.exports = userModel;
