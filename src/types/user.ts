export interface NewUser {
    email: string;
    passwordHash: string;
}

export interface User extends NewUser {
    id: string;
    created: Date | string;
}

export interface MongoUser extends NewUser {
    _id: string;
    created: Date | string;
}