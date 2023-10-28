import { Request, Response } from "express";

const test = (req: Request, res: Response): void => {
  console.log("jest request");
  res.json({ tak: "tak" });
};

export { test };
