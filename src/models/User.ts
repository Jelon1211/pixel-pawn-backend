import mongoose, { Document, Model } from "mongoose";
import { IUser } from "../types/user";

interface IUserModel extends IUser, Document {}

const userSchema = new mongoose.Schema<IUser>({
  firstname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

const UserModel: Model<IUserModel> = mongoose.model<IUserModel>(
  "User",
  userSchema
);

export default UserModel;
