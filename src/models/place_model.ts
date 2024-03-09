import mongoose, { Schema } from "mongoose";
import { IDiscoveredBy, IPlace } from "../utils/types";

const discoveredBySchema = new Schema<IDiscoveredBy>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  discoveredDate: { type: Date, required: true }
});

const placeSchema = new Schema<IPlace>({
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  isPublic: { type: Boolean, default: false },
  discoveredBy: [discoveredBySchema]
}, {
  timestamps: true,
});

const Place = mongoose.model<IPlace>('Place', placeSchema);
export default Place;