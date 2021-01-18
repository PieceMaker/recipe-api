// Modules
import axios from 'axios';
import Chance from 'chance';
const chance = new Chance();
import config from '../src/config';
import { DeleteWriteOpResultObject, ObjectId, UpdateWriteOpResult } from "mongodb";
import { expect } from 'chai';
import { deleteRecipe, mothersId, popeyesId, readRecipes, updateRecipe } from '../db/data/recipes';
import { existingUserJWT } from "../db/data/users";

// Managers
import dbManager from "../src/api/data/dbManager";

// Interfaces and Types
import { DeleteResult, NewRecipe, Recipe, SearchResult, UpdateResult } from "../src/types/recipe";
import { integer } from "../src/types/integer";

const authHeader = { Authorization: 'Bearer ' + existingUserJWT };
const commonSearchTerm = 'a';
const noRecipeId = '5fc0279e3a8b3e44e15fe399';
const { id: deleteId } = deleteRecipe;
const { id: updateId } = updateRecipe;
const mothersRecipe = readRecipes.find(recipe => recipe.id === mothersId);
const popeyesRecipe = readRecipes.find(recipe => recipe.id === popeyesId);
const newRecipe = {
    title: 'New Title',
    author: 'New Author',
    published: new Date(),
    recipe: 'New recipe'
};

const deleteById = async function(id: string): Promise<DeleteWriteOpResultObject> {
    await dbManager.initialized;
    return dbManager.db
        .collection('recipes')
        .deleteOne({ _id: new ObjectId(id) });
}
const insertById = async function(recipe: Recipe): Promise<any> {
    await dbManager.initialized;
    const { id, ...rest } = recipe;
    return dbManager.db
        .collection('recipes')
        .insertOne({ _id: new ObjectId(id), ...rest });
}
const updateById = async function(id: string, recipe: Recipe): Promise<UpdateWriteOpResult> {
    await dbManager.initialized;
    return dbManager.db
        .collection('recipes')
        .updateOne({ _id: new ObjectId(recipe.id) }, { $set: recipe });
}
const sortById = function(recipe1: Recipe, recipe2: Recipe): integer {
    if(recipe1.id < recipe2.id)
        return -1;
    if(recipe1.id > recipe2.id)
        return 1;
    return 0;
}
const apiDelete = function(id: string): Promise<DeleteResult> {
    return axios.delete(`http://localhost:8000/recipe/delete/${id}`, { headers: authHeader })
        .then(({ data }) => data);
}
const apiInsert = function(recipe: NewRecipe): Promise<string> {
    return axios.post('http://localhost:8000/recipe/insert', recipe, { headers: authHeader })
        .then(({ data }) => data);
}
const apiLoad = function(id: string): Promise<Recipe> {
    return axios.get(`http://localhost:8000/recipe/load/${id}`, { headers: authHeader })
        .then(({ data }) => data);
}
const apiSearch = function(searchTerm: string | undefined, page?: integer): Promise<SearchResult> {
    const url = `http://localhost:8000/recipe/search/${searchTerm}` + (page ? `/${page}` : '');
    return axios.get<SearchResult>(url, { headers: authHeader })
        .then(({ data }) => data);
}
const apiUpdate = function(recipe: Recipe): Promise<UpdateResult> {
    return axios.put<UpdateResult>('http://localhost:8000/recipe/update', recipe, { headers: authHeader })
        .then(({ data }) => data);
}

describe('Read', function() {

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
            const searchResult = await apiSearch(commonSearchTerm);
            expect(searchResult.count).to.equal(readRecipes.length);
            const sortedRecipes = readRecipes.sort(sortById);
            const sortedAPIRecipes = readRecipes.sort(sortById);
            expect(sortedAPIRecipes).to.eql(sortedRecipes);
        });

        it('should return result set of size equal to the configured documents per page on the first page', async function() {
            const firstPage = await apiSearch(commonSearchTerm, 1);
            expect(
                firstPage.count,
                'Even though results are paginated, count should be size of full result set'
            ).to.equal(readRecipes.length);
            expect(firstPage.recipes).to.have.lengthOf(config.documentsPerPage);
        });

        it('should return remaining recipes when requesting second page', async function() {
            const secondPage = await apiSearch(commonSearchTerm, 2);
            expect(
                secondPage.count,
                'Even though results are paginated, count should be size of full result set'
            ).to.equal(readRecipes.length);
            const numRemainingRecipes = readRecipes.length % config.documentsPerPage;
            expect(secondPage.recipes).to.have.lengthOf(numRemainingRecipes);
        });

    });

});

describe('Write', function() {

    describe('Insert', function() {

        it('should insert a new recipe', async function() {
            const id = await apiInsert(newRecipe);
            expect(id).to.have.lengthOf(24);

            try {
                await deleteById(id);
            } catch(error) {
                // Do nothing
            }
        });

    });

    describe('Update', function() {

        it('should return that zero records were modified if saving same record', async function() {
            if(updateRecipe) {
                const { modifiedCount } = await apiUpdate(updateRecipe);
                expect(modifiedCount).to.equal(0);
            } else {
                expect(
                    updateRecipe,
                    'We were unable to locate the update recipe'
                ).to.not.be.undefined;
            }
        });

        it('should return that one record was modified if modifying record', async function() {
            try {
                const author = chance.name();
                const modifiedRecipe = {
                    ...updateRecipe,
                    author
                };
                const { modifiedCount } = await apiUpdate(modifiedRecipe);
                expect(modifiedCount).to.equal(1);
                expect(
                    updateRecipe,
                    'We were unable to locate the update recipe'
                ).to.not.be.undefined;
            } finally {
                if(updateRecipe) {
                    await updateById(updateId, updateRecipe);
                }
            }
        });

    });

    describe('Delete', function() {

        it('should delete the record with the specified identifier', async function() {
            try {
                const { deletedCount } = await apiDelete(deleteId);
                expect(deletedCount).to.equal(1);
            } finally {
                await insertById(deleteRecipe);
            }
        });

        it('should return 0 when no records match the identifier', async function() {
            const { deletedCount } = await apiDelete(noRecipeId);
            expect(deletedCount).to.equal(0);
        });

    });

});