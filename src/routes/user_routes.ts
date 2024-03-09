import { Router } from "express";

import { userController } from "../controllers";

const userRouter = Router();

userRouter.route('/')
  .get(userController.getUsers)
  .delete(userController.deleteAllUsers);

userRouter.route('/:userId')
  .get(userController.getUserById)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

userRouter.route('/username')
  .post(userController.getUserByUsername);

export default userRouter;