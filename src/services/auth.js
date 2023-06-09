// Modules
const bcrypt = require("bcrypt");

// Models
const User = require("../models/User");

// Utils
const jwt = require("../utils/jwt");

// Constants
const constants = require("../constants");

/**
 * @param {String} username
 * @param {String} email
 * @param {String} password
 */
async function register(username, email, password) {
  try {
    // Save the created user
    const user = new User({
      username,
      email,
      password: await bcrypt.hash(password, constants.BCRYPT_SALT_ROUNDS),
    });
    const userResult = await user.save();
    // Create token
    const token = await createToken(userResult._id, userResult.username);
    return token;
  } catch (e) {
    throw e;
  }
}

/**
 * @param {String} username
 * @param {String} password
 * @param {object|null} cachedCredentials Object containing username and password properties with string values.
 */
async function login(username, password, cachedCredentials = null) {
  try {
    let userResult;

    // If a cache is provided, use it instead of the database.
    if (cachedCredentials) {
      userResult = cachedCredentials;
    } else {
      userResult = await User.findOne({ username });
    }

    const isCorrectPassword = await bcrypt.compare(
      password,
      userResult.password
    );
    if (!isCorrectPassword) {
      throw new Error("The password is not correct.");
    }

    // Create token
    const token = await createToken(
      userResult._id,
      userResult.username,
      userResult.isAdmin
    );
    return token;
  } catch (e) {
    throw e;
  }
}

async function createToken(_id, username, isAdmin) {
  try {
    const token = await jwt.sign(
      {
        _id,
        username,
        isAdmin,
      },
      constants.JWT_SECRET
    );
    return token;
  } catch (e) {
    throw e;
  }
}

async function isUserAdmin(userId) {
  const user = await User.findById(userId).lean();
  return user.isAdmin;
}

const authService = { register, login, isUserAdmin };

module.exports = authService;
