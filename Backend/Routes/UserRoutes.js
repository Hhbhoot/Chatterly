import express from 'express';
const Router = express.Router();
import {
  GetUser,
  LoginUser,
  LogoutUser,
  RegisterUser,
} from '../Controllers/UserController.js';
import RegisterSchema from '../Zod/RegisterSchema.js';
import validateSchema from '../Middlewares/validateSchema.js';
import upload from '../Middlewares/multer.js';
import LoginSchema from '../Zod/LoginSchema.js';
import { LoginProtect } from '../Middlewares/auth.js';

Router.route('/register').post(
  upload.single('avtar'),
  validateSchema(RegisterSchema),
  RegisterUser,
);

Router.route('/login').post(validateSchema(LoginSchema), LoginUser);

Router.route('/me').get(LoginProtect, GetUser);

Router.route('/logout').get(LoginProtect, LogoutUser);

export default Router;
