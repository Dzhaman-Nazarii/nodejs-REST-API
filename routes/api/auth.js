const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/auth");
const auth = require("../../middlewares/auth");

const { validateBody, emptyBody } = require("../../middlewares");

const { schemas } = require("../../models/user");

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);
router.post("/logout", auth, ctrl.logout);
router.get("/current", auth, ctrl.current);

module.exports = router;
