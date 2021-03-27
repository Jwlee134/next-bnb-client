import { Document } from "mongoose";
import { IUser } from "./user";

export interface IReview extends Document {
  text: string;
  creator: IUser["_id"];
  createdAt: Date;
  updatedAt: Date;
}
