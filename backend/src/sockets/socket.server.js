const { Server } = require("socket.io");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const aiResponse = require('../services/ai.service');
const messageModel = require("../models/message.model");


/* Socket server initiated */
const initSocketServer = (httpServer) => {

  const io = new Server(httpServer, {});


  /* Middleware for socket io */
  io.use(async (socket, next) => {

    const cookies = cookie.parseCookie(socket.handshake.headers?.cookie || "");

    /* Token check */
    if (!cookies.token) {

      next(new Error("Authentication error: Token not provided!"));

    }

    try {
      const decoded = jwt.verify(cookies.token, process.env.JWT_SECRET);

      const user = await userModel.findById(decoded.id);

      socket.user = user;

      next();

    } catch (error) {

      next(new Error("Authentication error: Invalid Token!"));

    }
  })


  io.on("connection", (socket) => {


    socket.on("ai-message", async (messagePayload) => {

      await messageModel.create({
        chat: messagePayload.chat,
        user: socket.user._id,
        content: messagePayload.content,
        role: "user"
      })


      const chatHistory = await messageModel.find({
        chat: messagePayload.chat,
      })

      // console.log(chatHistory);

      console.log(chatHistory.map(item => {
        return {
          role: item.role,
          parts: [{ text: item.content }]
        }
      }));

      // const response = await aiResponse.generateAiResponse(chatHistory.map(item => {
      //   return {
      //     role: item.role,
      //     parts: [{ text: item.content }]
      //   }
      // }));

      // const response = await aiResponse.generateAiResponse(messagePayload.content);

      await messageModel.create({
        chat: messagePayload.chat,
        user: socket.user._id,
        content: response,
        role: "model"
      })

      socket.emit("ai-response", {
        content: response,
        chat: messagePayload.chat,
      })

    })
  })
}

module.exports = initSocketServer;
