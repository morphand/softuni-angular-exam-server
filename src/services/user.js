// Models
const User = require("../models/User");

/**
 * Checks if a user exists in the database.
 * @param {String} username
 */
async function userExists(username) {
  return Boolean(await User.findOne({ username: username }));
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
  return await User.findOne({ username: username }).lean();
}

async function emailExists(email) {
  return Boolean(await User.findOne({ email: email }).lean());
}

const userService = {
  getOne,
  getOneByUsername,
  userExists,
  emailExists,
};

module.exports = userService;
