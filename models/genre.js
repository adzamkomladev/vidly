const mongoose = require("mongoose");

const Genre = mongoose.model(
  "Genre",
  new mongoose.Schema({
    name: { type: String, required: true, maxlength: 50, unique: true },
  })
);

module.exports = Genre;