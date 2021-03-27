import { Document } from "mongoose";
import { IReview } from "./review";
import { IRoom } from "./room";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  birthday: Date;
  avatarUrl: string;
  createdAt: Date;
  updatedAt: Date;
  isLoggedIn: boolean;
  rooms: IRoom["_id"];
  review: IReview["_id"];
  wishlist: IWishlist["_id"];
}

export interface IWishlist extends Document {
  title: string;
  list: IRoom["_id"];
  creator: IUser["_id"];
  createdAt: Date;
}

export interface OauthLoginBody {
  name: string;
  email: string | undefined;
  avatarUrl: string | undefined;
}
