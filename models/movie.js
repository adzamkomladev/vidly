const mongoose = require("mongoose");

const { genreSchema } = require("../models/genre");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
    unique: true,
  },
  numberInStock: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 10000,
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 10000,
  },
  genre: { type: genreSchema, required: true },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = {
  Movie,
  movieSchema,
};
