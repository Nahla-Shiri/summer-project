const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const Brand = require('../models/brand.model');
const Ambassador = require('../models/ambassador.model');

module.exports = (passport) => {
    let config = {};
    config.secretOrKey = process.env.JWT_SECRET;
    config.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

    passport.use(new JwtStrategy(config, async (jwtPayload, done) => {
        try {
        
            const brand = await Brand.findById(jwtPayload._id);
           const ambassador = await Ambassador.findById(jwtPayload._id);
            let user = {};
            if (brand) {
                user = brand;
                return done(null, user);
            }
            else if (ambassador) {
                user = ambassador;
                return done(null, user);
            }   
            else {
                return done(null, false);
            }
        }catch(e){
            return done(err, false);
        }
    }));
};