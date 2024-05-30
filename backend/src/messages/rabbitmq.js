const amqplib = require("amqplib/callback_api");
const User = require("../databases/schemas/User");
const Sources = require("../databases/schemas/sources");

require("dotenv").config();

const client = require("../databases/redis");

function rabbitMQ(io) {
  amqplib.connect(process.env.RABITMQ_URL, (error, connection) => {
    if (error) {
      return error;
    }
    connection.createChannel((error, channel) => {
      // Breaking News
      if (error) {
        return error;
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
        const user = await User.find({
          preferred_topics: { $in: source.category },
        });
        console.log(user || "No user found");
        user.forEach(async (u) => {
          const exists = await client.json.type(
            u._id.toString() + "_breaking_news"
          );
          console.log(exists);
          if (exists) {
            await client.json.arrAppend(
              u._id.toString() + "_breaking_news",
              ".breaking",
              data
            );
          }
          io.io.to(u._id.toString()).emit("breaking_news", data);
        });
        channel.ack(msg);
      });
    });
  });
}

module.exports = { rabbitMQ };
