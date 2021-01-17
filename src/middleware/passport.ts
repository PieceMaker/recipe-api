import config from '../config';
import passport from 'passport';
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';

// Managers
import userManager from '../api/managers/userManager';

// Engines
import { verifyPassword } from "../api/engines/passwordEngine";

// Errors
import { UserNotFound } from "../errors";

// Interfaces
import { User } from "../types/user";

function setupJWTStrategy() {
    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.jwt.secret,
        algorithms: [ config.jwt.algorithm ]
    }, (jwtPayload, done) => {
        if(Date.now() > jwtPayload.expires) {
            return done('JWT Expired', false);
        }
        return done(null, jwtPayload);
    }));
}

function setupLocalStrategy() {
    passport.use('local', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, async (username, password, done) => {
        try {
            const { passwordHash, ...rest } = await userManager.getUser(username);
            const passwordIsValid = await verifyPassword(password, passwordHash);
            if(!passwordIsValid) {
                return done(null, false);
            } else {
                const user: User = { ...rest };
                return done(null, user);
            }
        } catch(error) {
            if(error instanceof UserNotFound) {
                return done(null, false);
            }
            return done(error, false);
        }
    }));
}

export function setupStrategies() {
    setupLocalStrategy();
    setupJWTStrategy();
}