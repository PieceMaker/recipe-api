import { integer } from "./integer";

export interface BaseRecipe {
    title: string;
    author: string;
    image?: string;
    description?: string;
}

export interface NewRecipe extends BaseRecipe {
    published: Date | string;
    recipe: string;
    updated?: Date | string;
    url?: string
}

export interface Recipe extends NewRecipe {
    id: string;
}

export interface MongoRecipe extends NewRecipe {
    _id: string;
}

export interface SummaryRecipe extends BaseRecipe {
    id: string;
}

export interface SearchResult {
    count: integer;
    recipes: Recipe[];
}

export interface UpdateResult {
    modifiedCount: integer;
}