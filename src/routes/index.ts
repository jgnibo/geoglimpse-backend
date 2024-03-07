import { Router } from "express";

import tileRouter from "./tile_router";
import authRouter from "./auth_router";

const router = Router();

router.use('/tiles', tileRouter);
router.use('/auth', authRouter);

export default router;