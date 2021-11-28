const Customer = require("../models/customer");

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
