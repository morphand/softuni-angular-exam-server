// Utils
const jwt = require("../utils/jwt");

// Services
const authService = require("../services/auth");

// Constants
const { JWT_SECRET } = require("../constants");

// Utils
const Result = require("../utils/Result");

async function requiresToken(req, res, next) {
  let token = req.headers.authentication;
  const errorResult = new Result({
    success: false,
    errors: ["Invalid JSON web token."],
  });

  if (!token) {
    return res.json(errorResult);
  }

  try {
    token = token.replace("Bearer: ", "");
    const decodedToken = await jwt.verify(token, JWT_SECRET);
    const userId = decodedToken._id;
    const username = decodedToken.username;
    const isUserAdmin = await authService.isUserAdmin(userId);
    req.token = { userId, username, isUserAdmin };
    return next();
  } catch (e) {
    console.error(e);
    return res.json(errorResult);
  }
}

module.exports = requiresToken;
