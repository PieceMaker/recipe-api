export interface BaseUser {
    email: string;
    firstName: string;
    lastName: string;
    username: string;
}

export interface NewUser extends BaseUser {
    password: string;
    repeatPassword: string;
}

export interface User extends BaseUser {
    id: string;
    created: Date | string;
}

export interface MongoUser extends NewUser {
    _id: string;
    created: Date | string;
}