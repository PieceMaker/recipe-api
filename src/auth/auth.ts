// Modules
import passport from 'passport';
import { Strategy as localStrategy } from 'passport-local';

// Managers
import userManager from "../api/managers/userManager";

// Interfaces
import { NewUser } from "../types/user";

passport.use(
    'signup',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        async (req, email, password, done) => {
            try {
                const user: NewUser = req.body;
                const userId = await userManager.insert(user);
                done(null, { userId });
            } catch(error) {
                // Add error regarding user already existing
                done(error);
            }
        }
    )
)