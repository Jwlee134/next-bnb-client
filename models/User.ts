import mongoose, { Schema } from "mongoose";
import { IUser } from "types/user";

const UserSchema: Schema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  birthday: Date,
  avatarUrl: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
