import express from "express";
const router = express.Router();
import {
  createNewPawn,
  getPawnsForUser,
  getSinglePawn,
} from "../controllers/pawnsController";

import { verifyJWT } from "../middleware/verifyJWT";

router.use(verifyJWT);

router.route("/").get(getPawnsForUser).post(createNewPawn);
router.route("/:id").get(getSinglePawn);

export default router;
