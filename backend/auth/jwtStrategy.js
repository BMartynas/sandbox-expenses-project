import { Strategy, ExtractJwt } from 'passport-jwt';
import 'dotenv/config';
import passport from 'passport';
import usersService from '../services/users.js';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const jwtStrategy = new Strategy(options, (payload, done) => {
  const user = usersService.getUserByEmail(payload.email);
  if (user) {
    return done(null, user);
  }
  return done(null, false);
});

passport.use(jwtStrategy);

export const jwtAuth = passport.authenticate('jwt', { session: false });
