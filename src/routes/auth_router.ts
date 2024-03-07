import { Router } from 'express';
import { authController } from '../controllers';

const authRouter = Router();

authRouter.route('/register')
  .post(authController.register);

authRouter.route('/login')
  .post(authController.login);

authRouter.route('/logout')
  .post(authController.logout);

authRouter.route('/verify')
  .post(authController.verifyUser);

export default authRouter;
