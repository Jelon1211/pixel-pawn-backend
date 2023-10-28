import { Request, Response } from "express";

import User from "../models/User";
import bcrypt from "bcrypt";
import { IUser, ErrorMessage } from "../types/user";

const getUser = async (
  req: Request<IUser>,
  res: Response<IUser | ErrorMessage>
) => {
  const username = req.body.username;
  const user = await User.findOne({ username: username }).exec();

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
};

const createNewUser = async (
  req: Request<IUser>,
  res: Response<IUser | ErrorMessage>
) => {
  const { firstname, password, username } = req.body;

  if (!firstname || !password || !username) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const duplicate = await User.findOne({ username }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate username" });
  }

  const hashedPwd = await bcrypt.hash(password, 10);

  const userObject = { firstname, password: hashedPwd, username };

  const user = await User.create(userObject);

  if (user) {
    res.status(201).json({ message: `New user ${username} created` });
  } else {
    res.status(400).json({ message: "Invalid user data recived" });
  }
};

export { getUser, createNewUser };
