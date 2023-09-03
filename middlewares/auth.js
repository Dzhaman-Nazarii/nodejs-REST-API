const jwt = require("jsonwebtoken");

const { HttpError } = require("../helpers");
const { User } = require("../models/user");

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const [bearer, token] = authHeader.split(" ", 2);
  if (bearer !== "Bearer") {
    throw HttpError(401, "Not authorized");
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        throw HttpError(401, "Token is expired");
      }

      next(err);
    }

    try {
      const user = await User.findById(decode.id).exec();
      if (user.token !== token) {
        throw HttpError(401, "You are not authorize");
      }

      req.user = {
        id: decode.id,
        email: user.email,
        subscription: user.subscription,
      };

      next();
    } catch (err) {
      next(err);
    }
  });
};

module.exports = auth;
