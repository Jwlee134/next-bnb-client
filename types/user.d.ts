import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  birthday: Date;
  avatarUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OauthLoginBody {
  name: string;
  email: string | undefined;
  avatarUrl: string | undefined;
}
