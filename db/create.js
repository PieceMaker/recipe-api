// Script to be run by mongo to create collection with validator.
//
// mongo localhost:27017/recipes db/create.js

db.createCollection( "recipes", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: [ "title", "author", "published", "recipe" ],
            properties: {
                title: { bsonType: "string" },
                author: { bsonType: "string" },
                published: { bsonType: "date" },
                recipe: { bsonType: "string" },
                updated: { bsonType: "date" },
                image: { bsonType: "string" },
                description: { bsonType: "string" },
                url: { bsonType: "string" }
            }
        }
    }
});