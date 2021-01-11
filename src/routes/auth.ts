// Modules
import express from 'express';
import { EmailInUse, UsernameInUse } from "../errors";

// Managers
import userManager from "../api/managers/userManager";

// Interfaces
import { NewUser } from "../types/user";

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const user: NewUser = req.body;
        const { email, username } = user;
        const [ emailInUse, usernameInUse ] = await Promise.all([
            userManager.checkEmail(email),
            userManager.checkUsername(username)
        ]);
        if(usernameInUse) {
            res.status(400).send(new UsernameInUse(username));
        } else if(emailInUse) {
            res.status(400).send(new EmailInUse(email));
        } else {
            const userId = await userManager.insert(user);
            res.status(200).send({ userId });
        }
    } catch(error) {
        res.status(400).send(error.message);
    }
});

export default router;