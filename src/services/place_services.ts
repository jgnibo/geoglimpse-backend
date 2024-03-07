import Place from "../models/place_model";
import { IPlace } from "../utils/types";

const createPlace = async (placeData: IPlace) => {
  try {
    const place = new Place(placeData);
    await place.save();
    return place;
  } catch (error) {
    throw new Error(`Error creating place: ${error}`);
  }
};

const getPlaces = async () => {
  try {
    const places = await Place.find();
    return places;
  } catch (error) {
    throw new Error(`Error getting places: ${error}`);
  }
}

const getPlaceById = async (placeId: string) => {
  try {
    const place = await Place.findById(placeId);
    return place;
  } catch (error) {
    throw new Error(`Error getting place by placeId: ${error}`);
  }
}

const getPlaceByCreatorId = async (creatorId: string) => {
  try {
    const place = await Place.find({ creatorId });
    return place;
  } catch (error) {
    throw new Error(`Error getting place by indexedId: ${error}`);
  }
}

const updatePlace = async (placeId: string, placeData: IPlace) => {
  try {
    const place = await Place.findByIdAndUpdate(placeId, placeData);
    return place
  } catch (error) {
    throw new Error(`Error updating place: ${error}`);
  }
}

const deletePlace = async (placeId: string) => {
  try {
    const place = await Place.findByIdAndDelete(placeId);
    return place;
  } catch (error) {
    throw new Error(`Error deleting place: ${error}`);
  }
}

const deleteAllPlaces = async () => {
  try {
    const places = await Place.deleteMany();
    return places;
  } catch (error) {
    throw new Error(`Error deleting all places: ${error}`);
  }
}

export default {
  createPlace,
  getPlaces,
  getPlaceById,
  getPlaceByCreatorId,
  updatePlace,
  deletePlace,
  deleteAllPlaces
}