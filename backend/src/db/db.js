const mongoose = require("mongoose");

/* Database connection setup */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected!");
  } catch (error) {
    console.log("Error to connect MongoDB", error);
  }
}

module.exports = connectDB;
