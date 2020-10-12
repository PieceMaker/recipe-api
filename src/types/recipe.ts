import { integer } from "./integer";

export interface BaseRecipe {
    title: string;
    author: string;
    image?: string;
    description?: string;
}

export interface NewRecipe extends BaseRecipe {
    published: Date;
    recipe: string;
    updated?: Date;
    url?: string
}

export interface Recipe extends NewRecipe {
    id: string;
}

export interface SummaryRecipe extends BaseRecipe {
    id: string;
}

export interface SearchResult {
    count: integer;
    recipes: Recipe[];
}