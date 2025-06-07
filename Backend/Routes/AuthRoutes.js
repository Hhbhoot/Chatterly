import express from 'express';
import passport from '../passport/index.js';
import generateToken from '../Utils/generateToken.js';
import { saveCookie } from '../Utils/CookieSaver.js';
const router = express.Router();

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${process.env.DOMAIN_URL}/login?error=true`,
  }),
  (req, res, next) => {
    try {
      const token = generateToken(req.user._id);
      if (!token) {
        return next(new AppError('Failed to generate token', 500));
      }

      saveCookie(token, res);
      res.redirect(process.env.DOMAIN_URL);
    } catch (err) {
      next(err);
    }
  },
);

router.get(
  '/facebook',
  passport.authenticate('facebook', { scope: ['email'] }),
);

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: `${process.env.DOMAIN_URL}/login?error=true`,
  }),
  (req, res) => {
    const token = generateToken(req.user._id);
    saveCookie(token, res);
    res.redirect(`${process.env.DOMAIN_URL}`);
  },
);

export default router;
