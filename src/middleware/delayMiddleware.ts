import { Request, Response, NextFunction } from "express";

export const delayMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const delay = Math.random() * (2000 - 500) + 1000;
  setTimeout(() => {
    next();
  }, delay);
};
