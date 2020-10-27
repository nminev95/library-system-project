import passportJwt from 'passport-jwt';
import { PRIVATE_KEY } from './../config.js';

const options = {
    secretOrKey: PRIVATE_KEY,
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtStrategy = new passportJwt.Strategy(options, async (payload, done) => {
    const userData = {
        id: payload.sub,
        username: payload.username,
        role: payload.role,
        banInfo: payload.banInfo,
        email: payload.email,
        level: payload.level,
        registered: payload.register_date,
    };

    done(null, userData);
});

export default jwtStrategy;
