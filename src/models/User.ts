import mongoose, { Document, model } from "mongoose";
import { IUser } from "../types/user";

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
});

const UserModel = model<IUser>("User", userSchema);

export default UserModel;
