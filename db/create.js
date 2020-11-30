// Script to be run by mongo to create collection with validator.
//
// mongo localhost:27017/recipes db/create.js

db.createCollection("recipes", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: [ "title", "author", "published", "recipe" ],
            properties: {
                title: { bsonType: "string" },
                author: { bsonType: "string" },
                published: { bsonType: [ "date", "string" ] },
                recipe: { bsonType: "string" },
                updated: { bsonType: [ "date", "string" ] },
                image: { bsonType: "string" },
                description: { bsonType: "string" },
                url: { bsonType: "string" }
            }
        }
    }
});

db.createCollection("users", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: [ "email", "password", "created" ],
            properties: {
                email: { bsonType: "string" },
                password: { bsonType: "string" },
                created: { bsonType: [ "date", "string" ]}
            }
        }
    }
});

db.users.createIndex({ email: 1 }, { unique: true });