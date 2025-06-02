import dotenv from 'dotenv';
import passport from 'passport';
import { Strategy as GoogleStratagy } from 'passport-google-oauth20';
import UserModel from '../Models/UserModel.js';
dotenv.config();

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStratagy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await UserModel.findOne({
        email: profile.emails[0].value,
      });
      if (!user) {
        const newUser = new UserModel({
          email: profile.emails[0].value,
          name: profile.displayName,
          avatar: {
            url: profile.photos[0].value,
            public_id: '',
          },
        });
        await newUser.save();
      }

      done(null, profile);
    },
  ),
);

export default passport;
