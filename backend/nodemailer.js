const nodemailer = require("nodemailer");
require("dotenv").config();

const config = {
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
};

const send = (data, callback) => {
  const transporter = nodemailer.createTransport(config);
  transporter.sendMail(data, (err, info) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, info.response);
    }
  });
};

module.exports = { send };
