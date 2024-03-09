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
    const places = await Place.find().populate('discoveredBy.user', 'username');
    return places;
  } catch (error) {
    throw new Error(`Error getting places: ${error}`);
  }
}

const getPlaceById = async (placeId: string) => {
  try {
    const place = await Place.findById(placeId).populate('discoveredBy.user', 'username');
    return place;
  } catch (error) {
    throw new Error(`Error getting place by placeId: ${error}`);
  }
}

const getPlaceByCreatorId = async (creatorId: string) => {
  try {
    const place = await Place.find({ creatorId }).populate('discoveredBy.user', 'username');
    return place;
  } catch (error) {
    throw new Error(`Error getting place by indexedId: ${error}`);
  }
}


// Viewable is the union of places created by the user, as well as places that are public
const getViewablePlaces = async (creatorId: string) => {
  try {
    const places = await Place.find({
      $or: [
        { creatorId: creatorId },
        { isPublic: true }
      ]
    }).populate('discoveredBy.user', 'username');
    return places;
  } catch (error) {
    throw new Error(`Error getting available places: ${error}`);
  }
}

// Just all public places
const getPublicPlaces = async () => {
  try {
    const places = await Place.find({ isPublic: true }).populate('discoveredBy.user', 'username');
    return places
  } catch (error) {
    throw new Error(`Error getting public places: ${error}`)
  }
}

const updatePlace = async (placeId: string, placeData: IPlace) => {
  try {
    const place = await Place.findByIdAndUpdate(placeId, placeData).populate('discoveredBy.user', 'username');
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

const discoverPlace = async (placeId: string, userId: string) => {
  try {
    const place = await Place.findById(placeId);

    if (!place) {
      throw new Error(`Place not found`);
    }

    const discoveredByEntry = {
      user: userId,
      discoveredDate: new Date(),
    }

    place.discoveredBy.push(discoveredByEntry);
    await place.save();
    return place.populate('discoveredBy.user', 'username');
  } catch (error) {
    throw new Error(`Error discovering place: ${error}`)
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
  getViewablePlaces,
  getPublicPlaces,
  updatePlace,
  deletePlace,
  discoverPlace,
  deleteAllPlaces
}