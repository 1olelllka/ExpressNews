const { body, validationResult } = require("express-validator");

const patchUserValidate = [
  body("username")
    .if(body("username").exists())
    .isLength({ min: 4 })
    .withMessage("Username must be at least 4 characters long"),
  body("email")
    .if(body("email").exists())
    .isEmail()
    .withMessage("Invalid email")
    .normalizeEmail(),
  body("full_name")
    .if(body("full_name").exists())
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

module.exports = patchUserValidate;
