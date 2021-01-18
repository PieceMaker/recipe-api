import axios from 'axios';
import { expect } from 'chai';
import { existingUser } from "../db/data/users";
import dbManager from "../src/api/data/dbManager";
import { DeleteWriteOpResultObject } from "mongodb";

// Interfaces
import { NewUser } from "../src/types/user";

const newUser: NewUser = {
    email: 'new@user.org',
    firstName: 'New',
    lastName: 'User',
    username: 'nuser',
    password: 'abc',
    repeatPassword: 'abc'
};

const authRegister = function(newUser: NewUser) {
    return axios.post('http://localhost:8000/auth/register', newUser)
        .catch(({ response }) => response);
}

const deleteNewUser = async function(): Promise<DeleteWriteOpResultObject> {
    await dbManager.initialize();
    return dbManager.db
        .collection('users')
        .deleteOne({ username: newUser.username });
}

describe('Authorization', function() {

    describe('Register', function () {

        it('should throw a "PasswordMismatch" error when the passwords do not match', async function () {
            const mismatchingPasswordUser = {...newUser};
            mismatchingPasswordUser.repeatPassword = mismatchingPasswordUser.password + 'd';
            const {data, status} = await authRegister(mismatchingPasswordUser);
            expect(status).to.equal(400);
            expect(data).to.have.all.keys(['message', 'name']);
            expect(data.name).to.equal('PasswordMismatch');
        });

        it('should throw an "EmailInUse" error when the email matches an existing one', async function () {
            const matchingEmailUser = {...newUser};
            matchingEmailUser.email = existingUser.email;
            const {data, status} = await authRegister(matchingEmailUser);
            expect(status).to.equal(400);
            expect(data).to.have.all.keys(['email', 'message', 'name']);
            expect(data.name).to.equal('EmailInUse');
            expect(data.email).to.equal(existingUser.email);
        });

        it('should throw a "UsernameInUse" error when the username matches an existing one', async function () {
            const matchingUsernameUser = {...newUser};
            matchingUsernameUser.username = existingUser.username;
            const {data, status} = await authRegister(matchingUsernameUser);
            expect(status).to.equal(400);
            expect(data).to.have.all.keys(['message', 'name', 'username']);
            expect(data.name).to.equal('UsernameInUse');
            expect(data.username).to.equal(existingUser.username);
        });

        it('should return the inserted user identifier when successfully registering', async function () {
            const {data, status} = await authRegister(newUser);
            expect(status).to.equal(200);
            expect(data).to.have.all.keys(['userId']);
            expect(data.userId).to.be.a('string');
        });

        after(async function () {
            await deleteNewUser();
        });

    });

});