export class EmailInUse extends Error {
    public email: string;

    constructor(email: string) {
        super('Email already in use.');
        this.email = email;
    }

    toJSON() {
        return {
            email: this.email,
            message: this.message,
            name: 'EmailInUse'
        };
    }
}

export class PasswordMismatch extends Error {
    constructor() {
        super('Password must match repeated password.');
    }

    toJSON() {
        return {
            message: this.message,
            name: 'PasswordMismatch'
        }
    }
}

export class UsernameInUse extends Error {
    public username: string;

    constructor(username: string) {
        super('Username already in use.');
        this.username = username;
    }

    toJSON() {
        return {
            username: this.username,
            message: this.message,
            name: 'UsernameInUse'
        };
    }
}