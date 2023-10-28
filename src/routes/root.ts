import { Router } from "express";
const router = Router();
import { join } from "path";
import { Request, Response } from "express";

router.get("^/$|index(.html)?", (req: Request, res: Response) => {
  res.sendFile(join(__dirname, "..", "views", "index.html"));
});

export default router;
