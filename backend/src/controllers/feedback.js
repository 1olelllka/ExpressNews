const Feedback = require("../databases/schemas/feedback");
const { send } = require("../../nodemailer");

const feedback = async (req, res) => {
  const { description } = req.body;

  try {
    const feedback = new Feedback({
      description: description,
      email: req.user.email,
    });
    send({
      from: "ExpressNews Team <0I0z5@example.com>",
      to: req.user.email,
      subject: "Feedback",
      text: "Thank you for your feedback, you have enabled email notifications concerning the status of an issue. We will try to fix it as soon as possible.\nAs soon as we fix it, you will receive a notification on your email.\n\n\n\nBest regards,\nExpressNews Team",
    });
    await feedback.save();
    res.status(201).send("Feedback has been sent successfully");
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = { feedback };
