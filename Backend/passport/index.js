import dotenv from 'dotenv';
import passport from 'passport';
import { Strategy as GoogleStratagy } from 'passport-google-oauth20';
import { Strategy as FacebookStratagy } from 'passport-facebook';
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
      scope: ['profile', 'email'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await UserModel.findOne({
          email: profile.emails[0].value,
        });
        if (!user) {
          user = new UserModel({
            email: profile.emails[0].value,
            name: profile.displayName,
            provider: 'google',
            avatar: {
              url: profile.photos[0].value,
              public_id: '',
            },
          });
          await user.save();
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    },
  ),
);

passport.use(
  new FacebookStratagy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ['id', 'displayName', 'emails', 'name', 'photos'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await UserModel.findOne({
          email: profile.emails[0].value,
        });
        if (!user) {
          user = new UserModel({
            email: profile.emails[0].value,
            name: profile.displayName,
            provider: 'facebook',
            avatar: {
              url: profile.photos[0].value,
              public_id: '',
            },
          });
          await user.save();
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    },
  ),
);

export default passport;
