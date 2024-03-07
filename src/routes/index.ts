import { Router } from "express";

import authRouter from "./auth_router";
import placeRouter from './place_router';
import tileRouter from "./tile_router";
import userRouter from "./user_routes";

const router = Router();

router.use('/auth', authRouter);
router.use('/places', placeRouter)
router.use('/tiles', tileRouter);
router.use('/users', userRouter);


export default router;