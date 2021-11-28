const debug = require("debug")("vidly:routes:genres");
const express = require("express");

const genresService = require("../services/genres");

const createGenreSchema = require("../validations/genres/create");
const updateGenreSchema = require("../validations/genres/update");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const genres = await genresService.findAll();
    res.send(genres);
  } catch (err) {
    debug(err);
    res.status(500).send("Failed to retrieve genres");
  }
});

router.post("/", async (req, res) => {
  const { error } = createGenreSchema.validate(req.body);
  if (error) return res.status(422).send(error.details[0].message);

  try {
    const genre = await genresService.create(req.body);

    if (!genre) {
      return res.status(400).send("Genre already exists");
    }

    res.status(201).send(genre);
  } catch (err) {
    debug(err);
    res.status(500).send("Failed to store genre");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const genre = await genresService.findOneById(req.params.id);

    if (!genre) {
      return res.status(404).send("Genre not found");
    }

    res.send(genre);
  } catch (err) {
    debug(err);
    res.status(500).send("Failed to retrieve genre");
  }
});

router.put("/:id", async (req, res) => {
  const { error } = updateGenreSchema.validate(req.body);
  if (error) return res.status(422).send(error.details[0].message);

  try {
    const genre = await genresService.update(req.params.id, req.body);

    if (!genre) {
      return res.status(404).send("Genre not found");
    }

    res.status(204).send("Genre updated successfully");
  } catch (err) {
    debug(err);
    res.status(500).send("Failed to update genre");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const genre = await genresService.delete(req.params.id);

    if (!genre) {
      return res.status(404).send("Genre not found");
    }

    res.status(204).send("Genre deleted successfully");
  } catch (err) {
    debug(err);
    res.status(500).send("Failed to delete genre");
  }
});

module.exports = router;
