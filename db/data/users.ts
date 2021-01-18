import { UserWithHash } from "../../src/types/user";

export const existingUser: UserWithHash = {
    id: '6003d6d60e0dfd01a73ee3c0',
    created: '2021-01-01T12:00:00.000Z',
    email: 'test@user.org',
    firstName: 'Test',
    lastName: 'User',
    username: 'tuser',
    passwordHash: '$2b$14$sgnrGXLv4ZFCEAQj/fSia.9q/BIjoowSAP4G0GwcWldwNyqLeH/OO' // test
}

export const existingUserJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
    'eyJ1c2VyIjp7ImlkIjoiNjAwM2Q2ZDYwZTBkZmQwMWE3M2VlM2MwIiwiY3JlYXRl' +
    'ZCI6IjIwMjEtMDEtMDFUMTI6MDA6MDAuMDAwWiIsImVtYWlsIjoidGVzdEB1c2Vy' +
    'Lm9yZyIsImZpcnN0TmFtZSI6IlRlc3QiLCJsYXN0TmFtZSI6IlVzZXIiLCJ1c2Vy' +
    'bmFtZSI6InR1c2VyIn0sImlhdCI6MTYxMDk0ODIyOX0.' +
    '5fnnCmIIwOn87ujYfcgE5oGcZW28hs7VRAcdISJloBI';