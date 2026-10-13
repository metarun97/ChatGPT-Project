const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require('../src/routes/auth.routes');
const chatRoutes = require('../src/routes/chat.routes');


/* Server created */
const app = express();

/* Middleware to read cookies data */
app.use(cookieParser())

/* Middleware to read req.body data */
app.use(express.json());

/* Auth router prefix */
app.use("/api/auth", authRoutes);

/* Chat router prefix */
app.use("/api/chat", chatRoutes);

module.exports = app;
