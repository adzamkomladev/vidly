const debug = require("debug")("vidly:routes:customers");
const express = require("express");

const customersService = require("../services/customers");

const createCustomerSchema = require("../validations/customers/create");
const updateCustomerSchema = require("../validations/customers/update");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const customers = await customersService.findAll();
    res.send(customers);
  } catch (err) {
    debug(err);
    res.status(500).send("Failed to retrieve customers");
  }
});

router.post("/", async (req, res) => {
  const { error } = createCustomerSchema.validate(req.body);
  if (error) return res.status(422).send(error.details[0].message);

  try {
    const customer = await customersService.create(req.body);

    if (!customer) {
      return res.status(400).send("Customer already exists");
    }

    res.status(201).send(customer);
  } catch (err) {
    debug(err);
    res.status(500).send("Failed to store customer");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const customer = await customersService.findOneById(req.params.id);

    if (!customer) {
      return res.status(404).send("Customer not found");
    }

    res.send(customer);
  } catch (err) {
    debug(err);
    res.status(500).send("Failed to retrieve customer");
  }
});

router.put("/:id", async (req, res) => {
  const { error } = updateCustomerSchema.validate(req.body);
  if (error) return res.status(422).send(error.details[0].message);

  try {
    const customer = await customersService.update(req.params.id, req.body);

    if (!customer) {
      return res.status(404).send("Customer not found");
    }

    res.status(204).send("Customer updated successfully");
  } catch (err) {
    debug(err);
    res.status(500).send("Failed to update customer");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const customer = await customersService.delete(req.params.id);

    if (!customer) {
      return res.status(404).send("Customer not found");
    }

    res.status(204).send("Customer deleted successfully");
  } catch (err) {
    debug(err);
    res.status(500).send("Failed to delete customer");
  }
});

module.exports = router;
