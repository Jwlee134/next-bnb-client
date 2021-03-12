import { Document } from "mongoose";
import { IReview, IRoomDetail } from "./room";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  birthday: Date;
  avatarUrl: string;
  createdAt: Date;
  updatedAt: Date;
  rooms: IRoomDetail["_id"];
  review: IReview["_id"];
}

export interface OauthLoginBody {
  name: string;
  email: string | undefined;
  avatarUrl: string | undefined;
}
