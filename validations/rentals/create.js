const Joi = require("joi");

module.exports = Joi.object({
  customerId: Joi.objectId().required(),
  movieId: Joi.objectId().required(),
  dateBorrowed: Joi.date(),
});
