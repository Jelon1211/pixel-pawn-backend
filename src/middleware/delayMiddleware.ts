import { Request, Response, NextFunction } from "express";

export const delayMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const delay = Math.random() * (5000 - 1000) + 1000;
  console.log(delay);
  setTimeout(() => {
    next();
  }, delay);
};
