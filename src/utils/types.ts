import mongoose from "mongoose";

export interface IUser {
  _id?: mongoose.Schema.Types.ObjectId | string;
  firstName: string;
  lastName: string;
  username: string
  email: string;
}

export interface IPlace {
  _id?: mongoose.Schema.Types.ObjectId | string;
  creatorId: mongoose.Schema.Types.ObjectId | string;
  name: string;
  description: string;
  imageUrl?: string;
  location: string;
}

interface IPolygon {
  type: string,
  coordinates: number[][][],
}

export interface ITile {
  _id?: mongoose.Schema.Types.ObjectId | string;
  indexedId: number;
  polygon: IPolygon;
}