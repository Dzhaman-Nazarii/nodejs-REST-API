const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  await User.findByIdAndUpdate(user._id, { token });
  res.send({ token });
};

const logout = async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { token: null });
  res.status(204).end();
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
};
