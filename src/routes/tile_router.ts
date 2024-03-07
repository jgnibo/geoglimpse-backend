import { Router } from "express";

import { tileController } from "../controllers";

const tileRouter = Router();

tileRouter.route('/')
  .post(tileController.createTile);

export default tileRouter;