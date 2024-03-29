import mongoose from "mongoose";

export interface IUser {
  _id?: mongoose.Schema.Types.ObjectId | string;
  username: string
  email: string;
  password: string;
  tileFrequency: Map<string, number>;
}

export interface IDiscoveredBy {
  user: mongoose.Schema.Types.ObjectId | string;
  discoveredDate: Date;
}

export interface IPlace {
  _id?: mongoose.Schema.Types.ObjectId | string;
  creatorId: mongoose.Schema.Types.ObjectId | string;
  name: string;
  description: string;
  imageUrl?: string;
  location: IPoint;
  isPublic: boolean;
  discoveredBy: IDiscoveredBy[];
}



export interface IPolygon {
  type: string,
  coordinates: number[][][],
}

export interface IPoint {
  type: string,
  coordinates: number[],
}

export interface ITile {
  _id?: mongoose.Schema.Types.ObjectId | string;
  indexedId: number;
  polygon: IPolygon;
}