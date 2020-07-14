const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const { JWT_SECRET, JWT_SESSION } = require('../config/');
const { findUser } = require('../models/user');

const secret = process.env.JWT_SECRET || JWT_SECRET;

const strategy = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret,
  },
  async (jwtPayload, done) => {
    try {
      const user = await findUser({ id: jwtPayload.id });

      if (!user) {
        const err = new Error('User not found');
        err.status = 404;
        throw err;
      }

      done(null, user);
    } catch (error) {
      done(error);
    }
  }
);

passport.use(strategy);

const initialize = () => {
  return passport.initialize();
};

const authenticate = () => {
  return passport.authenticate('jwt', JWT_SESSION);
};

module.exports = {
  initialize,
  authenticate,
};