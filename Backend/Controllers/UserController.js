import UserModel from '../Models/UserModel.js';
import asyncHandler from 'express-async-handler';
import AppError from '../Utils/AppError.js';
import cloudinary from '../Config/cloudinary.js';
import generateToken from '../Utils/generateToken.js';
import { removeCookie, saveCookie } from '../Utils/CookieSaver.js';
import sendMail from '../Utils/sendMail.js';

const RegisterUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, confirmPassword, gender } = req.body;
  console.log(password, confirmPassword);
  const avatarUrl = req.file?.path;
  const avatarPublicId = req.file?.filename; // 'filename' in multer-cloudinary is actually the Cloudinary `public_id`

  if (!name || !email || !password || !confirmPassword || !gender) {
    if (avatarPublicId) {
      await cloudinary.uploader.destroy(avatarPublicId);
    }

    return next(new AppError('Please provide all required fields', 400));
  }

  if (password !== confirmPassword) {
    if (avatarPublicId) {
      await cloudinary.uploader.destroy(avatarPublicId);
    }
    return next(new AppError('Passwords do not match', 400));
  }

  const userExists = await UserModel.findOne({ email });

  if (userExists) {
    if (avatarPublicId) {
      await cloudinary.uploader.destroy(avatarPublicId);
    }
    return next(new AppError('User already exists', 400));
  }

  const user = await UserModel.create({
    name,
    email,
    password,
    avatar: {
      url: avatarUrl,
      publicId: avatarPublicId,
    },
    gender,
  });
  if (!user) {
    if (avatarPublicId) {
      await cloudinary.uploader.destroy(avatarPublicId);
    }
    return next(new AppError('Failed to register user ', 500));
  }

  const token = generateToken(user._id);
  if (!token) {
    if (avatarPublicId) {
      await cloudinary.uploader.destroy(avatarPublicId);
    }
    return next(new AppError('Failed to generate token', 500));
  }
  saveCookie(token, res);
  res.status(201).json({
    status: 'success',
    message: 'User registered successfully',
    data: {
      user,
      token,
    },
  });
});

const LoginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide all required fields', 400));
  }

  const user = await UserModel.findOne({ email }).select('+password');

  if (!user || !(await user.comparePassword(password))) {
    return next(new AppError('Invalid email or password', 401));
  }

  const token = generateToken(user._id);
  if (!token) {
    return next(new AppError('Failed to generate token', 500));
  }
  saveCookie(token, res);

  res.status(200).json({
    status: 'success',
    message: 'User logged in successfully',
    data: {
      user,
      token,
    },
  });
});

const GetUser = asyncHandler(async (req, res, next) => {
  const user = req.user;
  if (!user) {
    return next(new AppError('User not found', 404));
  }
  res.status(200).json({
    status: 'success',
    message: 'User fetched successfully',
    data: {
      user,
    },
  });
});

const UpdateUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  const avatarUrl = req.file?.path;
  const avatarPublicId = req.file?.filename;
});

const LogoutUser = asyncHandler(async (req, res, next) => {
  removeCookie(res);
  res.status(200).json({
    status: 'success',
    message: 'User logged out successfully',
  });
});

const ForgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new AppError('Please provide all required fields', 400));
  }

  const user = await UserModel.findOne({ email });

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  const token = generateToken(user._id);
  if (!token) {
    return next(new AppError('Failed to generate token', 500));
  }

  const data = await sendMail(user.name, email, token);
  
  if (!data) {
    return next(new AppError('Failed to send password reset email', 500));
  }


  res.status(200).json({
    status: 'success',
    message: 'Password reset email sent successfully',
  });
});

export {
  RegisterUser,
  LoginUser,
  LogoutUser,
  GetUser,
  UpdateUser,
  ForgotPassword,
};
