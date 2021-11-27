const Joi = require("joi");

module.exports = Joi.object({
  name: Joi.string().min(3).max(50).required(),
});
