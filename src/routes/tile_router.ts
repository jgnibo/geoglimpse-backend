import { Router } from "express";

import { tileController } from "../controllers";

const tileRouter = Router();

tileRouter.route('/')
  .post(tileController.createTile)
  .get(tileController.getTiles)
  .delete(tileController.deleteAllTiles);

tileRouter.route('/:tileId')
  .get(tileController.getTileById)
  .patch(tileController.updateTile)
  .delete(tileController.deleteTile);

tileRouter.route('/indexed/:indexedId')
  .get(tileController.getTileByIndexedId);

export default tileRouter;