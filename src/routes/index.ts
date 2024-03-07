import { Router } from "express";

import tileRouter from "./tile_router";

const router = Router();

router.use('/tiles', tileRouter);

export default router;