const amqplib = require("amqplib/callback_api");
const { rabbitMQ } = require("../../src/messages/rabbitmq");
const { httpLogger } = require("../../src/logs/winston");

describe("RabbitMQ Unit Test", () => {
  it("Should call RabbitMQ and establish simple connection", async () => {
    const mData = {
      content: '{"source": {"name":"general"}}',
    };
    const mChannel = {
      assertQueue: jest.fn(),
      consume: jest.fn().mockImplementation((queue, callback) => {
        callback(mData);
      }),
    };
    const mConnection = {
      createChannel: jest.fn().mockImplementation((callback) => {
        callback(null, mChannel);
      }),
    };
    jest.spyOn(amqplib, "connect").mockImplementation((url, callback) => {
      callback(null, mConnection);
    });
    const mIO = {
      io: {
        emit: jest.fn(),
      },
    };
    rabbitMQ(mIO);
    expect(amqplib.connect).toBeCalledWith(
      "amqp://localhost",
      expect.any(Function)
    );
    expect(mConnection.createChannel).toBeCalledWith(expect.any(Function));
    expect(mChannel.assertQueue).toBeCalledWith("breaking_news", {
      durable: true,
    });
    expect(mChannel.consume).toBeCalledWith(
      "breaking_news",
      expect.any(Function)
    );
  });
  it("Should return error if RabbitMQ connection fails", async () => {
    jest.spyOn(amqplib, "connect").mockImplementation((url, callback) => {
      callback("some critical error", null);
    });
    const mIO = {
      io: {
        emit: jest.fn(),
      },
    };
    rabbitMQ(mIO);
    expect(amqplib.connect).toHaveReturned();
  });
  it("Should return error if RabbitMQ is unable to create a Channel", async () => {
    const mConnection = {
      createChannel: jest.fn().mockImplementation((callback) => {
        callback("some critical error", null);
      }),
    };
    jest.spyOn(amqplib, "connect").mockImplementation((url, callback) => {
      callback(null, mConnection);
    });
    const mIO = {
      io: {
        emit: jest.fn(),
      },
    };
    rabbitMQ(mIO);
    expect(amqplib.connect).toBeCalledWith(
      "amqp://localhost",
      expect.any(Function)
    );
    expect(mConnection.createChannel).toHaveReturned();
  });
});
