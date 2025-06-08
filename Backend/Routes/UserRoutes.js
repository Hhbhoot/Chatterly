import express from 'express';
const Router = express.Router();
import {
  ForgotPassword,
  GetUser,
  LoginUser,
  LogoutUser,
  RegisterUser,
  ResetPassword,
  validateToken,
} from '../Controllers/UserController.js';
import RegisterSchema from '../Zod/RegisterSchema.js';
import validateSchema from '../Middlewares/validateSchema.js';
import upload from '../Middlewares/multer.js';
import LoginSchema from '../Zod/LoginSchema.js';
import { LoginProtect } from '../Middlewares/auth.js';
import ForgotPasswordSchema from '../Zod/forgotPassword.js';
import ResetPasswordSchema from '../Zod/ResetPassword.js';
import ValidateTokenSchema from '../Zod/Validatetoken.js';

Router.route('/register').post(
  upload.single('avatar'),
  validateSchema(RegisterSchema),
  RegisterUser,
);

Router.route('/validate-token').get(
  validateSchema(ValidateTokenSchema),
  validateToken,
);

Router.route('/login').post(validateSchema(LoginSchema), LoginUser);

Router.route('/me').get(LoginProtect, GetUser);

Router.route('/forgot-password').post(
  validateSchema(ForgotPasswordSchema),
  ForgotPassword,
);

Router.route('/reset-password').post(
  validateSchema(ResetPasswordSchema),
  ResetPassword,
);

Router.route('/logout').post(LoginProtect, LogoutUser);

export default Router;
