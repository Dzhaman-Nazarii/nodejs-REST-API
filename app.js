const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");

const { auth } = require("./middlewares");

const contactsRouter = require("./routes/api/contacts");
const authRouter = require("./routes/api/auth");

dotenv.config();

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/contacts", auth, contactsRouter);
app.use("/users", authRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;
