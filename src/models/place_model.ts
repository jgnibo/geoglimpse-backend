import mongoose, { Schema } from "mongoose";
import { IPlace } from "../utils/types";

const placeSchema = new Schema<IPlace>({
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String },
  location: { type: String, required: true }
}, {
  timestamps: true,
});

const Place = mongoose.model<IPlace>('Place', placeSchema);
export default Place;