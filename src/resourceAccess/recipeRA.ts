// Modules
import { Db, MongoClient, ObjectID } from 'mongodb';
import config from '../config';
import { fromMongoRecipe } from "../engines/formattingEngine";

// Types and Interfaces
import { integer } from "../types/integer";
import { MongoRecipe, NewRecipe, Recipe, SearchResult } from '../types/recipe';

class RecipeRA {
    private db: Db;

    public async insert(recipe: NewRecipe): Promise<string> {
        const { insertedId } = await this.db
            .collection('recipes')
            .insertOne(recipe);
        return insertedId;
    }

    public async load(id: string): Promise<Recipe> {
        const [ recipe ] = await this.db
            .collection('recipes')
            .find<MongoRecipe>({"_id": ObjectID.createFromHexString(id)})
            .toArray();
        return fromMongoRecipe(recipe);
    }

    public async search(pattern: string, page: integer): Promise<SearchResult> {
        const likePattern = `.*${pattern}.*`;
        const likePatternRegex = new RegExp(likePattern);
        const rowsToSkip = config.documentsPerPage * (page - 1);
        const recipesCursor = await this.db
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
            recipes: recipes.map(fromMongoRecipe)
        };
    }

    public async update(id: string, recipe: NewRecipe): Promise<{modifiedCount:integer, upsertedCount: integer}> {
        const {modifiedCount, upsertedCount} = await this.db
            .collection('recipes')
            .updateOne({"_id": ObjectID.createFromHexString(id)}, recipe);
        return {modifiedCount, upsertedCount};
    }

    public initialize(): Promise<void> {
        if(!this.db) {
            return new Promise<Db>((resolve, reject) => {
                MongoClient.connect(config.mongo.url, (error, client) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(client.db(config.mongo.db));
                });
            })
                .then((db) => {
                    this.db = db;
                });
        }
        return Promise.resolve();
    }
}

const recipeRA = new RecipeRA();
recipeRA.initialize();

export default recipeRA;