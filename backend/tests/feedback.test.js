const nodemailer = require("nodemailer");
const { send } = require("../nodemailer"); // Assuming your email service file is named emailService.js

jest.mock("nodemailer");

describe("Email Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Should send email successfully", async () => {
    // Mock nodemailer.createTransport to return a mock transporter
    nodemailer.createTransport.mockReturnValueOnce({
      sendMail: jest.fn((data, callback) => {
        callback(null, { response: "Email sent successfully" });
      }),
    });

    // Mock data to be sent
    const data = {
      from: "sender@example.com",
      to: "recipient@example.com",
      subject: "Test Email",
      text: "This is a test email.",
    };

    // Define a mock callback function
    const callback = jest.fn();

    // Call the send function with the callback
    send(data, callback);

    // Assert that nodemailer.createTransport was called with the correct config
    expect(nodemailer.createTransport).toHaveBeenCalledWith({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    // Expect the callback function to have been called with null (no error) and the response
    expect(callback).toHaveBeenCalledWith(null, "Email sent successfully");
  });

  test("Should handle send email error", async () => {
    // Mock nodemailer.createTransport to return a mock transporter
    nodemailer.createTransport.mockReturnValueOnce({
      sendMail: jest.fn((data, callback) => {
        callback(new Error("Email sending failed"), null);
      }),
    });

    // Mock data to be sent
    const data = {
      from: "sender@example.com",
      to: "recipient@example.com",
      subject: "Test Email",
      text: "This is a test email.",
    };

    // Define a mock callback function
    const callback = jest.fn();

    // Call the send function with the callback
    send(data, callback);

    // Assert that nodemailer.createTransport was called with the correct config
    expect(nodemailer.createTransport).toHaveBeenCalledWith({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    // Expect the callback function to have been called with the error and null response
    expect(callback).toHaveBeenCalledWith(
      new Error("Email sending failed"),
      null
    );
  });
});
