// Modules
import recipeRA from '../resourceAccess/recipeRA';

// Interfaces
import { Recipe } from "../interfaces/recipe";

export function load (id: string): Promise<Recipe> {
    return recipeRA.load(id);
};