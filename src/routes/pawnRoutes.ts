import express from "express";
const router = express.Router();
import { createNewPawn, getPawnsForUser } from "../controllers/pawnsController";

import { verifyJWT } from "../middleware/verifyJWT";

router.use(verifyJWT);

router.route("/").get(getPawnsForUser).post(createNewPawn);

export default router;
