const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


/* Register a user */
const registerUser = async (req, res) => {

  try {
    const { email, password, fullName: { firstName, lastName } } = req.body;

    const isUserAlreadyExist = await userModel.findOne({ email });

    if (isUserAlreadyExist) {
      res.status(400).json({
        message: "User already Exists!",
      })
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      email,
      password: hashPassword,
      fullName: { firstName, lastName }
    })


    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" })

    res.cookie("token", token);

    res.status(201).json({
      message: "User registered successfully!",
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
      }
    })

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error!",
    })
  }

}


/* Login a user */
const loginUser = async (req, res) => {

  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      res.status(400).json({
        message: "Invalid Email or Password!",
      })
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      res.status(400).json({
        message: "Invalid Email or Password!",
      })
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.cookie("token", token);

    res.status(200).json({
      message: "User login successfully!",
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
      }
    })

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error!",
    })
  }

}








module.exports = { registerUser, loginUser };
