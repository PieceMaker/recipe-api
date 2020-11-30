// Modules
import express from 'express';
import { EmailInUse } from "../errors";

// Managers
import userManager from "../api/managers/userManager";

// Interfaces
import { NewUser } from "../types/user";

const router = express.Router();

router.put('/signUp', async (req, res) => {
    try {
        const user: NewUser = req.body;
        const { email } = user;
        const emailInUse = await userManager.checkEmail(email);
        if(emailInUse) {
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