import mongoose, { Document, Schema, model } from "mongoose";
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
  isActive: {
    type: Boolean,
    required: true,
  },
  pawns: [
    {
      type: Schema.Types.ObjectId,
      ref: "Pawn",
    },
  ],
  credits: {
    type: Number,
    required: true,
    default: 2,
  },
});

const UserModel = model<IUser>("User", userSchema);

export default UserModel;
