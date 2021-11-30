const Joi = require("joi");

module.exports = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  numberInStock: Joi.number(),
  dailyRentalRate: Joi.number(),
  genreId: Joi.string().required(),
});
