require("dotenv").config();
const app = require('./src/app');
const connectDB = require('./src/db/db');
const initSocketServer = require('./src/sockets/socket.server');
const httpServer = require("http").createServer(app);


/* MongoDB connection call */
connectDB();

/* Socket server called */
initSocketServer(httpServer);

/* Server started */
httpServer.listen(3000, () => {
  console.log("Server running on Port: 3000");
})
