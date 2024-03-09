import { RequestHandler } from "express";
import { placeServices } from "../services";

const createPlace: RequestHandler = async (req, res) => {
  try {
    const { creatorId, name, description, imageUrl, location, isPublic } = req.body;
    const discoveredBy = [{ user: creatorId, discoveredDate: new Date() }];
    const newPlace = await placeServices.createPlace({ creatorId, name, description, imageUrl, location, isPublic, discoveredBy });
    res.status(201).json(newPlace);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error', error: err });
  }
};

const getPlaces: RequestHandler = async (req, res) => {
  try {
    const places = await placeServices.getPlaces();
    res.status(200).json(places);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error });
  }
}

const getPlaceById: RequestHandler = async (req, res) => {
  try {
    const { placeId } = req.params;
    const place = await placeServices.getPlaceById(placeId);
    res.status(200).json(place);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error });
  }
}

const getPlaceByCreatorId: RequestHandler = async (req, res) => {
  try {
    const { creatorId } = req.params;
    const place = await placeServices.getPlaceByCreatorId(creatorId);
    res.status(200).json(place);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error });
  }
}

const getViewablePlaces: RequestHandler = async (req, res) => {
  try {
    const { creatorId } = req.params;
    const places = await placeServices.getViewablePlaces(creatorId);
    res.status(200).json(places);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error });

  }
}

const getPublicPlaces: RequestHandler = async (req, res) => {
  try {
    const places = await placeServices.getPublicPlaces();
    res.status(200).json(places);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error });
  }
}

const updatePlace: RequestHandler = async (req, res) => {
  try {
    const { placeId } = req.params;
    const placeData = req.body;
    const updatedPlace = await placeServices.updatePlace(placeId, placeData);
    res.status(200).json(updatedPlace);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error });
  }
}

const deletePlace: RequestHandler = async (req, res) => {
  try {
    const { placeId } = req.params;
    const deletedPlace = await placeServices.deletePlace(placeId);
    res.status(200).json(deletedPlace);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error });
  }
}

const discoverPlace: RequestHandler = async (req, res) => {
  try {
    const { placeId, userId } = req.body;
    const discoveredPlace = await placeServices.discoverPlace(placeId, userId);
    res.status(200).json(discoveredPlace);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error });
  }
}

const deleteAllPlaces: RequestHandler = async (req, res) => {
  try {
    const deletedPlaces = await placeServices.deleteAllPlaces();
    res.status(200).json(deletedPlaces);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error });
  }
}

const placeController = {
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

export default placeController;