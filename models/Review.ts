import mongoose, { Schema } from "mongoose";
import { IReview } from "types/room";

const ReviewSchema: Schema = new mongoose.Schema({
  text: String,
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Review ||
  mongoose.model<IReview>("Review", ReviewSchema);
