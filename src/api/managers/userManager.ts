// Resource Access
import userRA from "../resourceAccess/userRA";

// Interfaces
import { NewUser } from "../../types/user";

class UserManager {
    public insert(user: NewUser): Promise<string> {
        return userRA.insert(user);
    }
}

export default new UserManager();