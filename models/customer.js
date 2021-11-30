const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxlength: 100,
    minlength: 3,
  },
  phone: { type: String, required: true, maxlength: 20 },
  isGold: { type: Boolean, default: false },
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = {
  Customer,
  customerSchema,
};
