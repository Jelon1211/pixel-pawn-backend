import { Types } from "mongoose";

export interface IUser {
  name: string;
  password: string;
  email: string;
  isActive: boolean;
  pawns?: Types.ObjectId[];
  credits: Number;
}

export type ErrorMessage = { message: string };
