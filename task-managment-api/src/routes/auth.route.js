import { Router } from "express";
import {
  login,
  signup,
  sendOtpMail,
  resetPassword,
  sendOtpMailforReset,
  getDetails,
} from "../controllers/auth.controller.js";
import { verifyUserToken } from "../middlewares/AuthMiddleware.js";

///import { verifyUserToken } from "../middlewares/AuthMiddleware.js";

const router = Router();

router.get("/health", (req, res) => {
  res.send("User Auth Service is Healthy!");
});

router.route("/send-otp-email").post(sendOtpMail);
router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/send-reset-password-otp").post(sendOtpMailforReset);
router.route("/reset-password").put(resetPassword);
router.route("/profile").put(verifyUserToken, getDetails);

export default router;
