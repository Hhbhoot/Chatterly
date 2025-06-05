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
  (err, req, res) => {
    if (err) {
      console.error('OAuth Error:', err); // <--- this will show the real issue
      return res.redirect('/login?error=oauth');
    }

    console.log(req.user);
    res.redirect(process.env.DOMAIN_URL);
  },
);

export default router;
