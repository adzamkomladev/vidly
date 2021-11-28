const mongoose = require("mongoose");

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
      maxlength: 100,
      minlength: 3,
    },
    phone: { type: String, required: true, maxlength: 20 },
    isGold: { type: Boolean, default: false },
  })
);

module.exports = Customer;
