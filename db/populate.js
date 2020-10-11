// Script to populate collection with test data.
//
// mongo localhost:27017/recipes db/populate.js

db.recipes.insert(
    [
        {
            title: "Family Recipe",
            author: "Your mom",
            published: new Date(),
            recipe: "Some markdown to be filled in later.",
            description: "A delectable recipe for a dish your mom always cooks."
        },
        {
            title: "Popeye's Spicy Strips",
            author: "Popeye",
            published: new Date(),
            recipe: "Ingredients and procedures for cooking Popeye's strips.",
            description: "How to cook the world's best spicy chicken strips."
        }
    ]
)