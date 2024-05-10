const io = require("../../index").io;

io.on("connection", async (socket) => {
  console.log(
    "\x1b[41m%s\x1b[0m",
    `Socket.IO ----> Client  \x1b[43m<< ${socket.handshake.auth.userId} >>\x1b[0m\x1b[41m connected via Socket.IO <----\x1b[0m`
  );
  require("./rabbitmq");
  socket.join(socket.handshake.auth.userId);
});

module.exports = { io };
