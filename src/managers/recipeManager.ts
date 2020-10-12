// Modules
import { escapePattern } from "../engines/formattingEngine";
import recipeRA from '../resourceAccess/recipeRA';

// Interfaces
import { integer } from "../types/integer";
import { Recipe, SearchResult } from "../types/recipe";

export function load (id: string): Promise<Recipe> {
    return recipeRA.load(id);
};

export function search (pattern: string, page: integer): Promise<SearchResult> {
    const escapedPattern = escapePattern(pattern);
    return recipeRA.search(escapedPattern, page);
}