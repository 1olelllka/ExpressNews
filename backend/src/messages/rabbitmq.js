const amqplib = require("amqplib/callback_api");
const discordUser = require("../databases/schemas/discordUser");
const googleUser = require("../databases/schemas/googleUser");
const User = require("../databases/schemas/localUser");
const Sources = require("../databases/schemas/sources");

const io = require("../../index").io;

io.on("connection", async (socket) => {
  console.log(
    "\x1b[41m%s\x1b[0m",
    `Socket.IO ----> Client  \x1b[43m<< ${socket.handshake.auth.userId} >>\x1b[0m\x1b[41m connected via Socket.IO <----\x1b[0m`
  );
  amqplib.connect(process.env.RABITMQ_URL, (error, connection) => {
    if (error) {
      console.log(error);
    }
    console.log(
      "\x1b[41m%s\x1b[0m",
      "Message Broker ----> Connected to RabbitMQ <----"
    );
    connection.createChannel((error, channel) => {
      if (error) {
        console.log(error);
      }
      const queue = "breaking_news";

      channel.assertQueue(queue, {
        durable: true,
      });

      channel.consume(queue, async (msg) => {
        const data = JSON.parse(msg.content.toString());
        console.log("Received data from API");
        const source =
          (await Sources.findOne({ name: data.source.name })) || "general";
        const user =
          (await discordUser.find({
            preferred_topics: { $in: source.category },
          })) ||
          (await googleUser.find({
            preferred_topics: { $in: source.category },
          })) ||
          (await User.find({ preferred_topics: { $in: source.category } }));
        console.log(user || "No user found");
        user.forEach((u) => {
          io.to(u._id.toString()).emit("breaking_news", data);
        });
        channel.ack(msg);
      });
    });
  });
  socket.join(socket.handshake.auth.userId);
});

module.exports = { amqplib };
