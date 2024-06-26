const { body, validationResult } = require("express-validator");

const feedbackValidate = [
  body("description").notEmpty().withMessage("Description is required"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    next();
  },
];

module.exports = feedbackValidate;
