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