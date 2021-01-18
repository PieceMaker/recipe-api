// Modules
import jsonwebtoken from 'jsonwebtoken';
import config from '../../config';

// Interfaces
import { JWTPayload } from "../../types/jwt";
import { User } from "../../types/user";

export function issueJWT(user: User): { token: string } {
    // TODO: Figure out why setting algorithm here breaks TS...
    // const options = {
    //     algorithm: "HS256",
    //     expiresIn: config.jwt.expiresIn
    // }
    const token = jsonwebtoken.sign(
        { user },
        config.jwt.secret,
        {
            algorithm: 'HS256',
            expiresIn: config.jwt.expiresIn
        }
    );
    return { token };
}

export function isExpired(payload: JWTPayload) {
    return Math.ceil(Date.now() / 1000) > payload.exp;
}