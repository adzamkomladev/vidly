const Joi = require("joi");

module.exports = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  numberInStock: Joi.number().required(),
  dailyRentalRate: Joi.number().required(),
  genreId: Joi.string().required(),
});
