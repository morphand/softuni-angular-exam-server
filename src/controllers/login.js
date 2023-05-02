// Services
const userService = require("../services/user");
const authService = require("../services/auth");

// Utils
const Result = require("../utils/Result");

const validators = require("../utils/validators");

/**
 * @param {Map<string, (string|{})>} authCache
 */
function login(authCache) {
  return async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const result = new Result({
      success: false,
      errors: [],
      value: {},
      wasCached: false,
    });

    // Check if username and password are valid.
    const areValidLoginCredentials = validators.areValidLoginCredentials(
      username,
      password
    );
    if (areValidLoginCredentials.length > 0) {
      result.errors.push(...areValidLoginCredentials);
      return res.json(result);
    }

    // Check if username exists.
    const userExists = await userService.userExists(username);
    if (!userExists) {
      result.errors.push("This username does not exist.");
      return res.json(result);
    }

    // If cached, get from the cache.
    const cachedCredentials = authCache.get(username);
    if (cachedCredentials) {
      try {
        const token = await authService.login(
          username,
          password,
          cachedCredentials
        );
        result.success = true;
        result.value = { token };
        result.wasCached = true;
      } catch (e) {
        result.errors.push(e.message);
      }

      return res.json(result);
    }

    // Else, get from database.
    try {
      const token = await authService.login(username, password);
      result.success = true;
      result.value = { token };

      // Cache the response.
      const user = await userService.getOneByUsername(username);
      authCache.set(username, user);
    } catch (e) {
      result.errors.push(e.message);
    }

    return res.json(result);
  };
}

module.exports = login;
