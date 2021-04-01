import { Document } from "mongoose";
import { IRoom } from "./room";
import { IUser } from "./user";

export interface IReview extends Document {
  text: string;
  creator: IUser["_id"];
  room: IRoom["_id"];
  createdAt: Date;
  updatedAt: Date;
}
