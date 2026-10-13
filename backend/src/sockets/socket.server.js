const { Server } = require("socket.io");


const initSocketServer = (httpServer) => {

  const io = new Server(httpServer, {});


  io.on("connection", (socket) => {
    console.log("New socket connection", socket.id);
  })
}

module.exports = initSocketServer;
