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

module.exports.findAll = async () => await Customer.find();

module.exports.findOneById = async (id) => await Customer.findById(id);

module.exports.create = async (body) => {
  if (await Customer.findOne({ name: new RegExp(body.name, "i") })) {
    return null;
  }

  const newCustomer = new Customer({
    name: body.name,
    phone: body.phone,
    isGold: body.isGold,
  });

  return await newCustomer.save();
};

module.exports.update = async (id, body) => {
  return await Customer.findByIdAndUpdate(
    id,
    {
      $set: {
        name: body.name,
        phone: body.phone,
        isGold: body.isGold,
      },
    },
    { new: true }
  );
};

module.exports.delete = async (id) => {
  return await Customer.findByIdAndDelete(id);
};
