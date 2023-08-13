// Services
const carService = require("../services/car");
const userService = require("../services/user");

async function rent(req, res) {
  const result = await carService.rent(req.token.userId, req.body.carId);
  return res.json(result);
}

async function getRentedCars(req, res) {
  const userId = req.token.userId;
  const result = await userService.getUserRentedCars(userId);
  return res.json(result);
}

const rentController = {
  rent,
  getRentedCars,
};

module.exports = rentController;
