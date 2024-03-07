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

placeRouter.route('/creator/:indexedId')
  .get(placeController.getPlaceByCreatorId);

export default placeRouter;