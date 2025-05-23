import express from 'express';
const Router = express.Router();
import { RegisterUser } from '../Controllers/UserController.js';
import RegisterSchema from '../Zod/RegisterSchema.js';
import validateSchema from '../Middlewares/validateSchema.js';

Router.post('/register', validateSchema(RegisterSchema), RegisterUser);

export default Router;
