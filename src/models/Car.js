const mongoose = require("mongoose");

const CarSchema = mongoose.Schema({
  model: String,
  generation: String,
  madeIn: Number,
  class: String,
  doors: Number,
  powertrain: {
    fuel: String,
    sizeInL: Number,
    powerOutputInKw: Number,
    powerOutputInHp: Number,
    transmissionType: String,
    transmissionGears: Number,
  },
  dimensions: {
    lengthInMm: Number,
    widthInMm: Number,
    heightInMm: Number,
    weightInKg: Number,
  },
  imageURL: String,
});

const CarModel = mongoose.model("Car", CarSchema);

module.exports = CarModel;
