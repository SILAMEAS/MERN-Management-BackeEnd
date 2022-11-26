import pkg from "passport-jwt";
import UserModel from "../models/UserModel.js";
const JwtStrategy = pkg.Strategy;
const ExtractJwt = pkg.ExtractJwt;
import * as dotenv from "dotenv";
dotenv.config();
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

export default (passport) => {
  passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      UserModel.findById(jwt_payload._id, function (err, UserModel) {
        if (err) {
          return done(err, false);
        }
        if (UserModel) {
          return done(null, UserModel);
        } else {
          return done(null, false);
        }
      });
    })
  );
};
