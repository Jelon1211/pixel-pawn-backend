import express from "express";
const router = express.Router();
import { getUser, createNewUser } from "../controllers/usersController";

import { verifyJWT } from "../middleware/verifyJWT";

// router.use(verifyJWT)

router.route("/").get(getUser).post(createNewUser);

export default router;
