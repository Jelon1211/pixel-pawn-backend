import { Router } from "express";
const router = Router();
import { login, refresh, logout } from "../controllers/authController";
import loginLimiter from "../middleware/loginLimiter";

router.route("/").post(loginLimiter, login);

router.route("/refresh").get(refresh);

router.route("/logout").post(logout);

export default router;
