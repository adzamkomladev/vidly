const Joi = require("joi");

module.exports = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  phone: Joi.string().max(20).required(),
  isGold: Joi.boolean(),
});
