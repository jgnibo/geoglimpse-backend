import mongoose, { Schema } from "mongoose";
import { ITile } from "../utils/types";

const polygonSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Polygon'],
    required: true
  },
  coordinates: {
    type: [[[Number]]], // Array of arrays of arrays of numbers
    required: true
  }
});

const tileSchema = new Schema<ITile>({
  indexedId: { type: Number, required: true },
  polygon: polygonSchema
}, {
  timestamps: true,
});

tileSchema.index({ polygon: '2dsphere' });


const Tile = mongoose.model<ITile>('Tile', tileSchema);

export default Tile;