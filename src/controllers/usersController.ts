import { Request, Response } from "express";

import User from "../models/User";
import bcrypt from "bcrypt";
import { IUser, ErrorMessage } from "../types/user";

const getUser = async (
  req: Request<IUser>,
  res: Response<IUser | ErrorMessage>
) => {
  const email = req.body.email;
  const user = await User.findOne({ email: email }).exec();

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
};

const createNewUser = async (
  req: Request<IUser>,
  res: Response<IUser | ErrorMessage>
) => {
  const { name, password, email } = req.body;

  if (!name || !password || !email) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const duplicate = await User.findOne({ email }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate email" });
  }

  const hashedPwd = await bcrypt.hash(password, 10);

  const userObject = { name, password: hashedPwd, email };

  const user = await User.create(userObject);

  if (user) {
    res.status(201).json({ message: `New user ${email} created` });
  } else {
    res.status(400).json({ message: "Invalid user data recived" });
  }
};

export { getUser, createNewUser };
