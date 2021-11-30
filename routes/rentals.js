const debug = require("debug")("vidly:routes:rentals");
const express = require("express");

const rentalsService = require("../services/rentals");

const createRentalSchema = require("../validations/rentals/create");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const rentals = await rentalsService.findAll();
    res.send(rentals);
  } catch (err) {
    debug(err);
    res.status(500).send("Failed to retrieve rentals");
  }
});

router.post("/", async (req, res) => {
  const { error } = createRentalSchema.validate(req.body);
  if (error) return res.status(422).send(error.details[0].message);

  try {
    const rental = await rentalsService.create(req.body);

    if (!rental) {
      return res.status(400).send("Customer or Movie does not exist");
    }

    res.status(201).send(rental);
  } catch (err) {
    debug(err.message);

    if (err.message === "Movie not found") {
      return res.status(400).send(err.message);
    }
    if (err.message === "Customer not found") {
      return res.status(400).send(err.message);
    }

    if (err.message === "Movie not in stock") {
      return res.status(400).send(err.message);
    }

    res.status(500).send("Failed to store rental");
  }
});

module.exports = router;
