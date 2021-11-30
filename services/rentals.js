const mongoose = require("mongoose");

const Rental = require("../models/rental");
const { Customer } = require("../models/customer");
const { Movie } = require("../models/movie");

module.exports.findAll = async () =>
  await Rental.find().select(
    "dateBorrowed dateReturned customer._id customer.name customer.phone customer.isGold movie._id movie.title movie.dailyRentalRate rentalFee"
  );

module.exports.create = async (body) => {
  const session = await mongoose.connection.startSession();
  session.startTransaction();

  if (!(customer = await Customer.findById(body.customerId))) {
    throw new Error("Customer not found");
  }

  if (!(movie = await Movie.findById(body.movieId))) {
    throw new Error("Movie not found");
  }

  if (movie.numberInStock === 0) {
    throw new Error("Movie not in stock");
  }

  try {
    const newRental = new Rental({
      customer: {
        _id: customer._id,
        name: customer.name,
        phone: customer.phone,
        isGold: customer.isGold,
      },
      movie: {
        _id: movie._id,
        title: movie.title,
        dailyRentalRate: movie.dailyRentalRate,
      },
      rentalFee: movie.rentalFee,
    });

    const rental = await newRental.save({ session });

    movie.numberInStock--;
    await movie.save({ session });

    await session.commitTransaction();

    return rental;
  } catch (err) {
    await session.abortTransaction();

    throw err;
  } finally {
    session.endSession();
  }
};
