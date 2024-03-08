import { Router } from "express";

import { placeController } from "../controllers";

const placeRouter = Router();

placeRouter.route('/')
  .post(placeController.createPlace)
  .get(placeController.getPlaces)
  .delete(placeController.deleteAllPlaces);

placeRouter.route('/:tileId')
  .get(placeController.getPlaceById)
  .patch(placeController.updatePlace)
  .delete(placeController.deletePlace);

placeRouter.route('/creator/:creatorId')
  .get(placeController.getPlaceByCreatorId);

placeRouter.route('/viewable/:creatorId')
  .get(placeController.getViewablePlaces);

placeRouter.route('/public')
  .get(placeController.getPublicPlaces);

export default placeRouter;