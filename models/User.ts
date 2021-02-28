import mongoose, { Document, Schema } from "mongoose";

export interface User extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthday: string;
  avatarUrl: string;
  createdAt: string;
  updatedAt: string;
}

const UserSchema: Schema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  birthday: String,
  avatarUrl: String,
  createAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.User || mongoose.model<User>("User", UserSchema);
