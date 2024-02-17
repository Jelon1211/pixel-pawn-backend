import { Request, Response } from "express";

import User from "../models/User";
import { ErrorMessage, IPawn } from "../types/pawn";

const createNewPawn = async (
  req: Request<IPawn>,
  res: Response<IPawn | ErrorMessage>
) => {
  const { name, description, id } = req.body;

  if (!name || !description || !id) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  console.log()

  // const userObject = { name, password: hashedPwd, email };

  // const user = await User.create(userObject);

  // if (user) {
  //   res.status(201).json({ message: `New user ${email} created` });
  // } else {
  //   res.status(400).json({ message: "Invalid user data recived" });
  // }
};

export { createNewPawn };
