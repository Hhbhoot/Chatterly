import express from 'express';
import passport from '../passport/index.js';
const router = express.Router();

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect(process.env.DOMAIN_URL);
  },
);

export default router;
