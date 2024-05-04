const express = require("express");
const amqplib = require("amqplib/callback_api");
const Story = require("../databases/schemas/Story");
const { createServer } = require("node:http");
const { Server } = require("socket.io");

const app = express();

const server = createServer(app);
const io = new Server(server);

amqplib.connect("amqp://localhost", (err, conn) => {
  if (err) {
    console.log(err);
  }
  console.log(
    "\x1b[41m%s\x1b[0m",
    "Message Broker ----> Connected to RabbitMQ <----"
  );
  const queue_name = "news_queue";

  conn.createChannel((err, ch) => {
    if (err) {
      console.log(err);
    }
    ch.assertQueue(queue_name, { durable: true });
    ch.consume(queue_name, (msg) => {
      if (msg !== null) {
        const data = JSON.parse(msg.content.toString());
        const story = new Story(data);
        story
          .save()
          .then(() => {
            console.log("saved");
          })
          .catch((err) => {
            console.log(err);
          });
        io.emit("news", data);
        ch.ack(msg);
      }
    });
  });
});

io.on("connection", (socket) => {
  console.log(
    "\x1b[41m%s\x1b[0m",
    "Socket.IO ----> Client connected via Socket.IO <----"
  );
});

module.exports = { server, amqplib };
