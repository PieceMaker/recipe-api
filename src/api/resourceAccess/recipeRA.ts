// Modules
import dbManager from '../data/dbManager'
import { ObjectID } from 'mongodb';
import config from '../../config';
import { fromMongoRecord } from "../engines/formattingEngine";

// Types and Interfaces
import { integer } from "../../types/integer";
import { DeleteResult, MongoRecipe, NewRecipe, Recipe, SearchResult, UpdateResult } from '../../types/recipe';

class RecipeRA {
    public async delete(id: string): Promise<DeleteResult> {
        await dbManager.initialized;
        const { deletedCount } = await dbManager.db
            .collection('recipes')
            .deleteOne({"_id": ObjectID.createFromHexString(id)});
        return { deletedCount: deletedCount === undefined ? -1 : deletedCount };
    }

    public async insert(recipe: NewRecipe): Promise<string> {
        await dbManager.initialized;
        const { insertedId } = await dbManager.db
            .collection('recipes')
            .insertOne(recipe);
        return insertedId;
    }

    public async load(id: string): Promise<Recipe> {
        await dbManager.initialized;
        const [ recipe ] = await dbManager.db
            .collection('recipes')
            .find<MongoRecipe>({"_id": ObjectID.createFromHexString(id)})
            .toArray();
        return fromMongoRecord(recipe);
    }

    public async search(pattern: string, page: integer): Promise<SearchResult> {
        await dbManager.initialized;
        const likePattern = `.*${pattern}.*`;
        const likePatternRegex = new RegExp(likePattern);
        const rowsToSkip = config.documentsPerPage * (page - 1);
        const recipesCursor = await dbManager.db
            .collection('recipes')
            .find<MongoRecipe>({
                "$or": [
                    {title: likePatternRegex},
                    {recipe: likePatternRegex},
                    {description: likePatternRegex}
                ]
            });
        const [ count, recipes ] = await Promise.all([
            recipesCursor.count(),
            recipesCursor.skip(rowsToSkip).limit(config.documentsPerPage).toArray()
        ]);
        return {
            count,
            recipes: recipes.map(fromMongoRecord)
        };
    }

    public async update(id: string, recipe: NewRecipe): Promise<UpdateResult> {
        await dbManager.initialized;
        const { modifiedCount } = await dbManager.db
            .collection('recipes')
            .updateOne({"_id": ObjectID.createFromHexString(id)}, { $set: recipe });
        return { modifiedCount };
    }
}

export default new RecipeRA();