export default {
    mongo: {
        url: 'mongodb://localhost:27017',
        db: 'recipes'
    },
    documentsPerPage: 10,
    jwt: {
        algorithm: 'HS256',
        expiresIn: '1d',
        secret: 'MyTemp0r4ryS3cret'
    },
    saltRounds: 14
};