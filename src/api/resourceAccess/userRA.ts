// Managers
import dbManager from "../data/dbManager";

// Types and Interfaces
import { BaseUser, MongoUser } from "../../types/user";

class UserRA {
    public async insert(user: BaseUser, passwordHash: string): Promise<string> {
        await dbManager.initialized;
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

    public async getUser(username: string): Promise<MongoUser | null> {
        await dbManager.initialized;
        return dbManager.db
            .collection('users')
            .findOne<MongoUser>({ username });
    }
}

export default new UserRA();