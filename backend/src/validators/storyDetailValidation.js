const { param, validationResult } = require("express-validator");
const Stories = require("../databases/schemas/Story");

const storyDetailValidate = [
  param("id").custom(async (id) => {
    const story = await Stories.findById(id);
    if (!story) {
      throw new Error("Story not found");
    }
  }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).send({ errors: errors.array() });
    }
    next();
  },
];

module.exports = storyDetailValidate;
