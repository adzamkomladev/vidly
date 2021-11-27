const express = require("express");

const genresService = require("../services/genres");

const createGenreSchema = require("../validations/genres/create");
const updateGenreSchema = require("../validations/genres/update");

const router = express.Router();

router.get("/", (req, res) => {
  const genres = genresService.findAll();
  res.send(genres);
});

router.post("/", (req, res) => {
  const { error } = createGenreSchema.validate(req.body);
  if (error) return res.status(422).send(error.details[0].message);

  const genre = genresService.create(req.body);

  if (!genre) {
    return res.status(400).send("Genre already exists");
  }

  res.status(201).send(genre);
});

router.get("/:id", (req, res) => {
  const genre = genresService.findOneById(+req.params.id);

  if (!genre) {
    return res.status(404).send("Genre not found");
  }

  res.send(genre);
});

router.put("/:id", (req, res) => {
  const { error } = updateGenreSchema.validate(req.body);
  if (error) return res.status(422).send(error.details[0].message);

  const genre = genresService.update(+req.params.id, req.body);

  if (!genre) {
    return res.status(404).send("Genre not found");
  }

  res.status(204).send("Genre updated successfully");
});

router.delete("/:id", (req, res) => {
  const genre = genresService.delete(+req.params.id);

  if (!genre) {
    return res.status(404).send("Genre not found");
  }

  res.status(204).send("Genre deleted successfully");
});

module.exports = router;
