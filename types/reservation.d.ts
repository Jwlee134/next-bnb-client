import { Document } from "mongoose";
import { IUser, IRoomDetail } from "./room";

export interface IReservation extends Document {
  room: IRoomDetail["_id"];
  guest: IUser["_id"];
  host: IUser["_id"];
  checkIn: Date;
  checkOut: Date;
  guestCount: number;
  price: number;
  createdAt: Date;
  reviewed: boolean;
}
