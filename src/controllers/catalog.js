const carService = require("../services/car");

async function getAllCars(req, res) {
  const cars = await carService.getAll();
  return res.json(cars);
}

async function getCarById(req, res) {
  const carId = req.params.id;
  const car = await carService.getOneById(carId);
  return res.json(car);
}

const catalogController = {
  getAllCars,
  getCarById,
};

module.exports = catalogController;
