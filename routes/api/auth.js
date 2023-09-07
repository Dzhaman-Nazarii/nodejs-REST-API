const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/auth");
const auth = require("../../middlewares/auth");

const { validateBody, emptyBody, upload } = require("../../middlewares");

const { schemas } = require("../../models/user");

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);
router.get("/verify/:verificationToken", ctrl.verifyEmail);
router.post(
  "/verify/",
  validateBody(schemas.emailSchema),
  ctrl.resendVerifyEmail
);
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);
router.post("/logout", auth, ctrl.logout);
router.get("/current", auth, ctrl.current);
router.patch("/avatars", auth, upload.single("avatar"), ctrl.updateAvatar);

module.exports = router;
