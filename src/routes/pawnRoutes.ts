import express from "express";
const router = express.Router();
import { createNewPawn } from "../controllers/pawnsController";

import { verifyJWT } from "../middleware/verifyJWT";

router.use(verifyJWT);

router.route("/").post(createNewPawn);

export default router;
