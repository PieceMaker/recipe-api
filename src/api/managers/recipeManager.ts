// Modules
import { escapePattern } from "../engines/formattingEngine";
import recipeRA from '../resourceAccess/recipeRA';

// Interfaces
import { integer } from "../../types/integer";
import { DeleteResult, NewRecipe, Recipe, SearchResult, UpdateResult } from "../../types/recipe";

export function insert(recipe: NewRecipe): Promise<string> {
    return recipeRA.insert(recipe);
}

export function load(id: string): Promise<Recipe> {
    return recipeRA.load(id);
};

export function remove(id: string): Promise<DeleteResult> {
    return recipeRA.delete(id);
}

export function search(pattern: string, page: integer): Promise<SearchResult> {
    const escapedPattern = escapePattern(pattern);
    return recipeRA.search(escapedPattern, page);
}

export function update(recipe: Recipe): Promise<UpdateResult> {
    const {id, ...rest} = recipe;
    return recipeRA.update(id, rest);
}