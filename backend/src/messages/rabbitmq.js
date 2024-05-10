const amqplib = require("amqplib/callback_api");
const io = require("../../index").io;
const discordUser = require("../databases/schemas/discordUser");
const googleUser = require("../databases/schemas/googleUser");
const User = require("../databases/schemas/localUser");
const Sources = require("../databases/schemas/sources");

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
      user.forEach(async (u) => {
        io.to(u._id.toString()).emit("breaking_news", data);
      });
      channel.ack(msg);
    });
  });
});

module.exports = { amqplib };
