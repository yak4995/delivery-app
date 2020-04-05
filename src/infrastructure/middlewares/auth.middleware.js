const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const configService = require('../services/config.service');
const Client = require('../../../models').Client;

passport.initialize();
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('jwtSecret'),
    },
    (jwtPayload, done) => {
      Client.findOne({
        where: {
          email: jwtPayload.email,
          isActive: jwtPayload.isActive,
        }
      })
        .then(user => user ? done(null, user) : done(null, false))
        .catch(e => done(e, false));
    }
  ),
);
const middleware = passport.authenticate(
  'jwt',
  { session: false }
);

module.exports = middleware;