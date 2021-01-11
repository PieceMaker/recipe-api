// Managers
import dbManager from "../data/dbManager";

// Types and Interfaces
import { NewUser } from "../../types/user";

class UserRA {
    public async insert(user: NewUser): Promise<string> {
        await dbManager.initialized;
        const { insertedId } = await dbManager.db
            .collection('users')
            .insertOne({ ...user, created: (new Date()).toISOString() });
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