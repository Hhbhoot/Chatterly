import UserModel from '../Models/UserModel.js';
import asyncHandler from 'express-async-handler';

const RegisterUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  res.json({
    message: 'Register User',
    data: req.body,
  });
});

export { RegisterUser };
