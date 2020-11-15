import { MongoRecipe, Recipe } from "../types/recipe";

export function escapePattern (pattern: string): string {
    return pattern.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
}

export function fromMongoRecipe (mongoRecipe: MongoRecipe): Recipe {
    const { _id, ...rest } = mongoRecipe;
    return {
        id: _id,
        ...rest
    };
}

export function toMongoRecipe (recipe: Recipe): MongoRecipe {
    const { id, ...rest } = recipe;
    return {
        _id: id,
        ...rest
    };
}