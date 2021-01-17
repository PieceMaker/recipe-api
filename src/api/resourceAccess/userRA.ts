import bcrypt from 'bcrypt';
import config from '../../config';

// Managers
import dbManager from "../data/dbManager";

// Types and Interfaces
import { BaseUser, NewUser } from "../../types/user";

class UserRA {
    public async insert(user: NewUser): Promise<string> {
        await dbManager.initialized;
        const passwordHash = await bcrypt.hash(user.password, config.saltRounds);
        const dbUser: BaseUser & { passwordHash: string } = {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            passwordHash,
            username: user.username
        };
        const { insertedId } = await dbManager.db
            .collection('users')
            .insertOne({ ...dbUser, created: (new Date()).toISOString() });
        return insertedId;
    }

    public async checkEmailExists(email: string): Promise<boolean> {
        await dbManager.initialized;
        const matchingRecordCount = await dbManager.db
            .collection('users')
            .find({ email })
            .count();
        return matchingRecordCount > 0;
    }

    public async checkUsernameExists(username: string): Promise<boolean> {
        await dbManager.initialized;
        const matchingRecordCount = await dbManager.db
            .collection('users')
            .find({ username })
            .count();
        return matchingRecordCount > 0;
    }
}

export default new UserRA();