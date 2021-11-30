const Joi = require("joi");

module.exports = Joi.object({
  customerId: Joi.string().required(),
  movieId: Joi.string().required(),
  dateBorrowed: Joi.date(),
});
