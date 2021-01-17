// Resource Access
import userRA from "../resourceAccess/userRA";

// Engines
import { fromMongoRecord } from "../engines/formattingEngine";
import { hashPassword } from "../engines/passwordEngine";

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

    public async insert(user: NewUser): Promise<string> {
        const passwordHash = await hashPassword(user.password);
        return userRA.insert(user, passwordHash);
    }
}

export default new UserManager();