import axios from 'axios';
import { expect } from 'chai';
import { recipes } from '../db/data/recipes';
import {MongoRecipe, Recipe, SearchResult} from "../src/types/recipe";
import { integer } from "../src/types/integer";

const mothersId = '5fa8a136a26e5309eeda546b';
const popeyesId = '5fa8a511460dae6b34c2dee7';
const mothersRecipe = recipes.find(recipe => recipe._id === mothersId);
const popeyesRecipe = recipes.find(recipe => recipe._id === popeyesId);

const sortById = function(recipe1: MongoRecipe, recipe2: MongoRecipe): integer {
    if(recipe1._id < recipe2._id)
        return -1;
    if(recipe1._id > recipe2._id)
        return 1;
    return 0;
}
const apiLoad = function (id: string): Promise<Recipe> {
    return axios.get(`http://localhost:8000/load/${id}`)
        .then(({ data }) => data);
}
const apiSearch = function(searchTerm: string | undefined): Promise<SearchResult> {
    return axios.get<SearchResult>(`http://localhost:8000/search/${searchTerm}`)
        .then(({ data }) => data);
}

describe('API', function() {

    describe('Load', function() {

        it('should load mother\'s recipe given the mother\'s recipe id', async function() {
            const apiRecipe = await apiLoad(mothersId);
            expect(apiRecipe).to.eql(mothersRecipe);
        });

        it('should load Popeye\'s recipe given the Popeye\'s recipe id', async function() {
            const apiRecipe = await apiLoad(popeyesId);
            expect(apiRecipe).to.eql(popeyesRecipe);
        });

    });

    describe('Search', function() {

        it('should return both a count and an array of recipes', async function() {
            const searchResult = await apiSearch('a');
            expect(searchResult).to.have.keys([ 'count', 'recipes' ]);
        });

        it('should search by title', async function() {
            const title = mothersRecipe?.title;
            const searchResult = await apiSearch(title);
            expect(searchResult.count).to.equal(1);
            expect(searchResult.recipes).to.eql([ mothersRecipe ]);
        });

        it('should search by description', async function() {
            const description = popeyesRecipe?.description;
            const searchResult = await apiSearch(description);
            expect(searchResult.count).to.equal(1);
            expect(searchResult.recipes).to.eql([ popeyesRecipe ]);
        });

        it('should search by recipe', async function() {
           const recipe = popeyesRecipe?.recipe;
           const searchResult = await apiSearch(recipe);
           expect(searchResult.count).to.equal(1);
           expect(searchResult.recipes).to.eql([ popeyesRecipe ]);
        });

        it('should search using "like" comparison', async function() {
            const commonSearchTerm = 'a';
            const searchResult = await apiSearch(commonSearchTerm);
            expect(searchResult.count).to.equal(recipes.length);
            const sortedRecipes = recipes.sort(sortById);
            const sortedAPIRecipes = recipes.sort(sortById);
            expect(sortedAPIRecipes).to.eql(sortedRecipes);
        });

    });

});