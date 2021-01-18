// Interfaces
import { User } from "../src/types/user";

declare global {
    namespace Express {
        interface Request {
            user?: User | any;
        }
    }
}