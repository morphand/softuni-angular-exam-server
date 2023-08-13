// Models
const User = require("../models/User");
const Car = require("../models/Car");

// Utils
const Result = require("../utils/Result");

/**
 * @param {String} carName
 */
async function getOneByName(carName) {
  const result = new Result({
    success: false,
    errors: [],
    value: {},
    wasCached: false,
  });

  try {
    const car = await Car.findOne({ name: carName }).lean();
    result.success = true;
    result.value.car = car;
  } catch (e) {
    console.error(e.message);
    result.errors.push("Invalid car name.");
  } finally {
    return result;
  }
}

/**
 * @param {String} carId
 */
async function getOneById(carId) {
  const result = new Result({
    success: false,
    errors: [],
    value: {},
    wasCached: false,
  });

  try {
    const car = await Car.findById(carId).lean();
    result.success = true;
    result.value.car = car;
  } catch (e) {
    console.error(e.message);
    result.errors.push("Invalid car id.");
  } finally {
    return result;
  }
}

async function getAll() {
  const result = new Result({
    success: false,
    errors: [],
    value: {},
    wasCached: false,
  });

  try {
    const cars = await Car.find({}).lean();
    result.success = true;
    result.value.cars = cars;
  } catch (e) {
    console.error(e.message);
    result.errors.push("Error when trying to get all cars.");
  } finally {
    return result;
  }
}

async function rent(userId, carId) {
  const result = new Result({
    success: false,
    errors: [],
    value: {},
    wasCached: false,
  });

  try {
    const res = await User.findByIdAndUpdate(userId, {
      $push: { rentedCars: carId },
    });
    result.success = true;
    result.value = res;
  } catch (e) {
    result.errors.push(e);
  } finally {
    return result;
  }
}

const carService = {
  getOneByName,
  getOneById,
  getAll,
  rent,
};

module.exports = carService;
