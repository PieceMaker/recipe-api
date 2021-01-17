// Modules
import jsonwebtoken from 'jsonwebtoken';
import config from '../../config';

// Interfaces
import { User } from "../../types/user";

export function issueJWT(user: User): string {
    const payload = {
        user,
        iat: Date.now()
    };
    // TODO: Figure out why setting algorithm here breaks TS...
    // const options = {
    //     algorithm: "HS256",
    //     expiresIn: config.jwt.expiresIn
    // }
    return jsonwebtoken.sign(payload, config.jwt.secret, { algorithm: 'HS256', expiresIn: config.jwt.expiresIn});
}