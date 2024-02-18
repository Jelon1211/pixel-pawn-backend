import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import { IUser, ErrorMessage } from "../types/user";
import jwt from "jsonwebtoken";

const getUser = async (req: any, res: Response<any | ErrorMessage>) => {
  try {
    const foundUser = await User.findOne({ email: req.user }).exec();

    console.log({ email: req.user });

    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password, ...userWithoutPassword } = foundUser.toObject();
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const createNewUser = async (
  req: Request<IUser>,
  res: Response<IUser | ErrorMessage>
) => {
  const { name, password, email, isActive } = req.body;

  if (!name || !password || !email || !isActive) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const duplicate = await User.findOne({ email }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate email" });
  }

  const hashedPwd = await bcrypt.hash(password, 10);

  const userObject = { name, password: hashedPwd, email, isActive };

  const user = await User.create(userObject);

  if (user) {
    res.status(201).json({ message: `New user ${email} created` });
  } else {
    res.status(400).json({ message: "Invalid user data recived" });
  }
};

export { getUser, createNewUser };
