// Resource Access
import userRA from "../resourceAccess/userRA";

// Engines
import { fromMongoRecord } from "../engines/formattingEngine";

// Errors
import { UserNotFound } from "../../errors";

// Interfaces
import { MongoUser, NewUser, UserWithHash } from "../../types/user";

class UserManager {
    public checkEmail(email: string): Promise<boolean> {
        return userRA.checkEmailExists(email);
    }

    public checkUsername(userName: string): Promise<boolean> {
        return userRA.checkUsernameExists(userName);
    }

    public async getUser(userName: string): Promise<UserWithHash> {
        const mongoUser = await userRA.getUser(userName);
        if(!mongoUser) {
            throw new UserNotFound(userName);
        }
        return fromMongoRecord<MongoUser>(mongoUser);
    }

    public insert(user: NewUser): Promise<string> {
        return userRA.insert(user);
    }
}

export default new UserManager();