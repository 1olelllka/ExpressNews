const io = require("../../index").io;
const { httpLogger } = require("../logs/winston");

io.on("connection", async (socket) => {
  httpLogger.info(
    "Success connecting client to Socket.IO",
    `User: ${socket.handshake.auth.userId}`
  );
  socket.join(socket.handshake.auth.userId);
});

module.exports = { io };
