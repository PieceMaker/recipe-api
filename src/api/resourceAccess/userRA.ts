// Managers
import dbManager from "../data/dbManager";

// Types and Interfaces
import { NewUser } from "../../types/user";

class UserRA {
    public async insert(user: NewUser): Promise<string> {
        await dbManager.initialized;
        const { insertedId } = await dbManager.db
            .collection('users')
            .insertOne(user);
        return insertedId;
    }
}

export default new UserRA();