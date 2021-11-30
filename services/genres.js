const { Genre } = require("../models/genre");

module.exports.findAll = async () => await Genre.find();

module.exports.findOneById = async (id) => await Genre.findById(id);

module.exports.create = async (body) => {
  if (await Genre.findOne({ name: new RegExp(body.name, "i") })) {
    return null;
  }

  const newGenre = new Genre({
    name: body.name,
  });

  return await newGenre.save();
};

module.exports.update = async (id, body) => {
  return await Genre.findByIdAndUpdate(
    id,
    {
      $set: {
        name: body.name,
      },
    },
    { new: true }
  );
};

module.exports.delete = async (id) => {
  return await Genre.findByIdAndDelete(id);
};
