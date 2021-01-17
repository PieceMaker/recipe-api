// Modules
import express from 'express';
import passport from "passport";
import { EmailInUse, PasswordMismatch, UsernameInUse } from "../errors";

// Managers
import userManager from "../api/managers/userManager";

// Engines
import { errorToJSON } from "../api/engines/formattingEngine";
import { issueJWT } from "../api/engines/jwtEngine";

// Interfaces
import { NewUser } from "../types/user";

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const user: NewUser = req.body;
        const { email, password, repeatPassword, username } = user;
        const passwordsMatch = password === repeatPassword;
        const [ emailInUse, usernameInUse ] = await Promise.all([
            userManager.checkEmail(email),
            userManager.checkUsername(username)
        ]);
        if(!passwordsMatch) {
            throw new PasswordMismatch();
        } else if(usernameInUse) {
            throw new UsernameInUse(username);
        } else if(emailInUse) {
            throw new EmailInUse(email);
        } else {
            const userId = await userManager.insert(user);
            res.status(200).send({ userId });
        }
    } catch(error) {
        if(error.toJSON) {
            res.status(400).json(error);
        } else {
            res.status(500).json(errorToJSON(error));
        }
    }
});

router.post(
    '/login',
    passport.authenticate('local', { session: false }),
    (req, res) => {
        if(req.user) {
            res.status(200).send(issueJWT(req.user));
        } else {
            res.status(401).send('Invalid Username/Password');
        }
    }
);

export default router;