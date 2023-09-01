const bcrypt = require("bcrypt");

const User = require("../models/user");

const { HttpError, ctrlWrapper } = require("../helpers");

const register = async (req, res, next) => {
  const { password, email, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user !== null) {
    throw HttpError(409, "User already registered");
  }
  const passwordHash = await bcrypt.hash(password, 10);
  await User.create({ password: passwordHash, email, subscription });
  res.status(201).json({ message: "User register successfully" });
};

const login = async (req, res, next) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });
  if (user === null) {
    throw HttpError(401, "Email or password incorrect");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw HttpError(401, "Email or password incorrect");
  }
  res.send({ token: "TOKEN" });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
};
