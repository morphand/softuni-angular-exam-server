// Services
const userService = require("../services/user");
const authService = require("../services/auth");

// Utils
const Result = require("../utils/Result");

const validators = require("../utils/validators");

/**
 * @param {Map<string, (string|{})>} authCache
 */
function register(authCache) {
  return async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const repeatPassword = req.body.repeatPassword;
    const email = req.body.email;
    const result = new Result({
      success: false,
      errors: [],
      value: {},
      wasCached: false,
    });

    // Check if username and password are valid.
    const areValidRegisterCredentials = validators.areValidRegisterCredentials(
      username,
      password,
      repeatPassword,
      email
    );
    if (areValidRegisterCredentials.length > 0) {
      result.errors.push(...areValidRegisterCredentials);
      return res.json(result);
    }

    // Check if username exists.
    const userExists = await userService.userExists(username);
    if (userExists) {
      result.errors.push("This username already exists.");
      return res.json(result);
    }

    // Check if email exists.
    const emailExists = await userService.emailExists(email);
    if (emailExists) {
      result.errors.push("This email already exists.");
      return res.json(result);
    }

    try {
      const token = await authService.register(username, email, password);
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

module.exports = register;
