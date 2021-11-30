const debug = require("debug")("vidly:routes:movies");
const express = require("express");

const moviesService = require("../services/movies");

const createMovieSchema = require("../validations/movies/create");
const updateMovieSchema = require("../validations/movies/update");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const movies = await moviesService.findAll();
    res.send(movies);
  } catch (err) {
    debug(err);
    res.status(500).send("Failed to retrieve movies");
  }
});

router.post("/", async (req, res) => {
  const { error } = createMovieSchema.validate(req.body);
  if (error) return res.status(422).send(error.details[0].message);

  try {
    const movie = await moviesService.create(req.body);

    if (!movie) {
      return res.status(400).send("Movie already exists");
    }

    res.status(201).send(movie);
  } catch (err) {
    debug(err);
    res.status(500).send("Failed to store movie");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const movie = await moviesService.findOneById(req.params.id);

    if (!movie) {
      return res.status(404).send("Movie not found");
    }

    res.send(movie);
  } catch (err) {
    debug(err);
    res.status(500).send("Failed to retrieve movie");
  }
});

router.put("/:id", async (req, res) => {
  const { error } = updateMovieSchema.validate(req.body);
  if (error) return res.status(422).send(error.details[0].message);

  try {
    const movie = await moviesService.update(req.params.id, req.body);

    if (!movie) {
      return res.status(404).send("Movie not found");
    }

    res.status(204).send("Movie updated successfully");
  } catch (err) {
    debug(err);
    res.status(500).send("Failed to update movie");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const movie = await moviesService.delete(req.params.id);

    if (!movie) {
      return res.status(404).send("Movie not found");
    }

    res.status(204).send("Movie deleted successfully");
  } catch (err) {
    debug(err);
    res.status(500).send("Failed to delete movie");
  }
});

module.exports = router;
