const amqplib = require("amqplib/callback_api");
const discordUser = require("../databases/schemas/discordUser");
const googleUser = require("../databases/schemas/googleUser");
const User = require("../databases/schemas/localUser");

const server = require("../../index").server;
const io = require("../../index").io;

amqplib.connect("amqp://localhost", (err, conn) => {
  if (err) {
    console.log(err);
  }
  console.log(
    "\x1b[41m%s\x1b[0m",
    "Message Broker ----> Connected to RabbitMQ <----"
  );
  const queue_name = "news_updates";

  conn.createChannel((err, ch) => {
    if (err) {
      console.log(err);
    }
    ch.assertQueue(queue_name, { durable: true });
    ch.consume(queue_name, async (msg) => {
      if (msg !== null) {
        const data = JSON.parse(msg.content.toString());
        console.log("Received data from scraping server");

        const interestedUsers = await discordUser.find({
          preferred_topics: { $in: data.category },
        });
        console.log(interestedUsers);
        interestedUsers.forEach((user) => {
          io.to(user._id.toString()).emit("news_updates", data);
        });
        ch.ack(msg);
      }
    });
  });
});

io.on("connection", (socket) => {
  console.log(
    "\x1b[41m%s\x1b[0m",
    `Socket.IO ----> Client  \x1b[43m<< ${socket.handshake.auth.userId} >>\x1b[0m\x1b[41m connected via Socket.IO <----\x1b[0m`
  );
  socket.join(socket.handshake.auth.userId);
});

module.exports = { server, amqplib };
