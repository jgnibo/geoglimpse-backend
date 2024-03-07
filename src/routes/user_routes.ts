import { Router } from "express";

import { userController } from "../controllers";

const userRouter = Router();

userRouter.route('/')
  .get(userController.getUsers)
  .delete(userController.deleteAllUsers);

userRouter.route('/:tileId')
  .get(userController.getUserById)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

export default userRouter;