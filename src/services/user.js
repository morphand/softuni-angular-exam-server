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
async function getOne(
  userId,
  options = {
    excludePassword: false,
    excludeEmail: false,
  }
) {
  if (!options.excludePassword && !options.excludeEmail) {
    return User.findById(userId).lean();
  }
  const query = [];
  if (options.excludePassword) {
    query.push("-password");
  }
  if (options.excludeEmail) {
    query.push("-email");
  }
  return User.findById(userId).select(query).lean();
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

async function getUserStats(userId) {
  const user = await getOne(userId);
  return user.stats;
}

async function updateUserTurnsAvailable(userId, turnsAvailable) {
  return await User.findByIdAndUpdate(userId, {
    stats: { turnsAvailable },
  });
}

const userService = {
  getOne,
  getOneByUsername,
  userExists,
  emailExists,
  getUserStats,
  updateUserTurnsAvailable,
};

module.exports = userService;
