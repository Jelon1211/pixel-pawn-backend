import { Types } from "mongoose";

export interface IUser {
  name: string;
  password: string;
  email: string;
  active: boolean;
  pawns: Types.ObjectId[];
}

export type ErrorMessage = { message: string };
