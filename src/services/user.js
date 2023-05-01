// Models
const User = require("../models/User");

/**
 * Checks if a user exists in the database.
 * @param {String} userId
 */
async function userExists(userId) {
  return await User.findById(userId);
}

/**
 * Gets a single user by id.
 * @param {String} userId
 */
async function getOne(userId) {
  return User.findById(userId).lean();
}

/**
 * Gets a single user by username.
 * @param {String} username
 */
async function getOneByUsername(username) {
  return await User.find({ username: username }).lean();
}

const userService = {
  getOne,
  getOneByUsername,
  userExists,
};

module.exports = userService;
