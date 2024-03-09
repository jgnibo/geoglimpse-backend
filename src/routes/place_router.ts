import { Router } from "express";

import { placeController } from "../controllers";

const placeRouter = Router();

placeRouter.route('/')
  .post(placeController.createPlace)
  .get(placeController.getPlaces)
  .delete(placeController.deleteAllPlaces);

placeRouter.route('/:placeId')
  .get(placeController.getPlaceById)
  .patch(placeController.updatePlace)
  .delete(placeController.deletePlace);

placeRouter.route('/creator/:creatorId')
  .get(placeController.getPlaceByCreatorId);

placeRouter.route('/viewable/:creatorId')
  .get(placeController.getViewablePlaces);

placeRouter.route('/public')
  .get(placeController.getPublicPlaces);


placeRouter.route('/discover')
  .post(placeController.discoverPlace);

export default placeRouter;