import { Router } from "express";
const router = Router();
import { test } from "../controllers/authController";

router.route("/test").get(test);

export default router;
