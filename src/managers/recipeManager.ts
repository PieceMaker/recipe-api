// Modules
import recipeRA from '../resourceAccess/recipeRA';

// Interfaces
import { Recipe } from "../types/recipe";

export function load (id: string): Promise<Recipe> {
    return recipeRA.load(id);
};