import jwt from 'jsonwebtoken';
import UserModel from '../Models/UserModel.js';
import AppError from '../Utils/AppError.js';

export const LoginProtect = async (req, res, next) => {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return next(
        new AppError(
          'You are not logged in! Please log in to get access.',
          401,
        ),
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const currentUser = await UserModel.findById(decoded.id);

    if (!currentUser) {
      return next(
        new AppError(
          'The user belonging to this token does no longer exist.',
          401,
        ),
      );
    }
    req.user = currentUser;
    req.token = token;
    next();
  } catch (error) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401),
    );
  }
};
