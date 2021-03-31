import { Document } from "mongoose";
import { IUser } from "./user";

export interface IHostingState {
  largeBuildingType: {
    label: string | null;
    description: string | null;
  };
  buildingType: {
    label: string | null;
    description: string | null;
  };
  roomType: string | null;
  isForGuest: string | null;
  maximumGuestCount: number;
  bedroomCount: number;
  bedCount: number;
  bedType: { id: number; beds: { label: string; count: number }[] }[];
  publicBedType: { label: string; count: number }[];
  bathroomCount: number;
  country: string | null;
  province: string | null;
  city: string | null;
  streetAddress: string | null;
  detailAddress: string | null;
  postalCode: string | null;
  latitude: number;
  longitude: number;
  amenities: string[];
  spaces: string[];
  photos: string[];
  description: string | null;
  title: string | null;
  forbiddenRules: string[];
  customRules: string[];
  availability: number;
  blockedDayList: string[];
  price: number;
}

export interface IRoom extends IHostingState, Document {
  rating: { label: string; value: number }[];
  avgOfRating: number;
  createdAt: Date;
  updatedAt: Date;
  review: IReview["_id"];
  creator: IUser["_id"];
  [key: string]: any;
}
