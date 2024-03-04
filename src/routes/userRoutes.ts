import express from "express";
const router = express.Router();
import {
  getUser,
  createNewUser,
  getUserAuth,
} from "../controllers/usersController";

import { verifyJWT } from "../middleware/verifyJWT";

router.route("/").get(verifyJWT, getUser).post(createNewUser);

router.route("/auth").get(verifyJWT, getUserAuth);

export default router;
