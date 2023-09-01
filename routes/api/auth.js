const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/auth");
const auth = require("../../middlewares/auth");

router.post("/register", ctrl.register);
router.post("/login", ctrl.login);
router.post("/logout", auth, ctrl.logout);

module.exports = router;
