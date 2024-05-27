const { body, validationResult } = require("express-validator");
const User = require("../databases/schemas/User");

const registerValidate = [
  body("username")
    .isLength({ min: 4 })
    .withMessage("Full name must be at least 2 characters long"),
  body("email").isEmail().withMessage("Invalid email").normalizeEmail(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 6 characters long"),
  body("full_name")
    .isLength({ min: 5 })
    .withMessage("Full name must be at least 5 characters long"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    next();
  },
];

module.exports = registerValidate;
