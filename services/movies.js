const Movie = require("../models/movie");
const { Genre } = require("../models/genre");

module.exports.findAll = async () =>
  await Movie.find().select("title numberInStock dailyRentalRate genre");

module.exports.findOneById = async (id) =>
  await Movie.findById(id).select("title numberInStock dailyRentalRate genre");

module.exports.create = async (body) => {
  if (await Movie.findOne({ title: new RegExp(body.title, "i") })) {
    return null;
  }

  if (!(genre = await Genre.findById(body.genreId))) {
    return null;
  }

  const newMovie = new Movie({
    title: body.title,
    numberInStock: body.numberInStock ?? 0,
    dailyRentalRate: body.dailyRentalRate ?? 0,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
  });

  return await newMovie.save();
};

module.exports.update = async (id, body) => {
  if (!(genre = await Genre.findById(body.genreId))) {
    return null;
  }

  return await Movie.findByIdAndUpdate(
    id,
    {
      $set: {
        title: body.title,
        numberInStock: body.numberInStock,
        dailyRentalRate: body.dailyRentalRate,
        genre: {
          _id: genre._id,
          name: genre.name,
        },
      },
    },
    { new: true }
  );
};

module.exports.delete = async (id) => {
  return await Movie.findByIdAndDelete(id);
};
