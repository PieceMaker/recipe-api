// Script to populate collection with test data.
//
// mongo localhost:27017/recipes db/populate.js

db.recipes.insertMany(
    [
        {
            _id: ObjectId("5fa8a136a26e5309eeda546b"),
            title: "Family Recipe",
            author: "Your mom",
            published: new Date(),
            recipe: "Some markdown to be filled in later.",
            description: "A delectable recipe for a dish your mom always cooks."
        },
        {
            _id: ObjectId("5fa8a511460dae6b34c2dee7"),
            title: "Popeye's Spicy Strips",
            author: "Popeye",
            published: new Date(),
            recipe: "Ingredients and procedures for cooking Popeye's strips.",
            description: "How to cook the world's best spicy chicken strips."
        }
    ]
)