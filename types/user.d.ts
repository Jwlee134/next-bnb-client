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
  wishlist: IWishlist["_id"];
}

export interface IWishlist extends Document {
  title: string;
  list: IRoomDetail["_id"];
  creator: IUser["_id"];
  createdAt: Date;
}

export interface OauthLoginBody {
  name: string;
  email: string | undefined;
  avatarUrl: string | undefined;
}
