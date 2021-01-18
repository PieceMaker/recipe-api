// Interfaces
import { User } from "./user";

export interface JWTPayload {
    user: User,
    iat: number,
    exp: number
}