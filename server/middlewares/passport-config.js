const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const asyncHandler = require("express-async-handler");

const { User } = require("../models/user");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.ACCESS_KEY,
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(
      opts,
      asyncHandler(async (jwt_payload, done) => {
        const user = await User.findById(jwt_payload._id);
        if (user) {
          return done(null, user);
        }

        return done(null, false);
      })
    )
  );
};
