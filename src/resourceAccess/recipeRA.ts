// Modules
import { Db, MongoClient, ObjectID } from 'mongodb';
import config from '../config';

// Types and Interfaces
import { integer } from "../types/integer";
import { Recipe, SearchResult } from '../types/recipe';

class RecipeRA {
    private db: Db;

    public async load(id: string): Promise<Recipe> {
        const [ recipe ] = await this.db
            .collection('recipes')
            .find<Recipe>({"_id": ObjectID.createFromHexString(id)})
            .toArray();
        return recipe;
    }

    public async search(pattern: string, page: integer): Promise<SearchResult> {
        const likePattern = `.*${pattern}.*`;
        const likePatternRegex = new RegExp(likePattern);
        const recipesCursor = await this.db
            .collection('recipes')
            .find<Recipe>({
                "$or": [
                    {title: likePatternRegex},
                    {recipe: likePatternRegex},
                    {description: likePatternRegex}
                ]
            });
        const [ count, recipes ] = await Promise.all([
            recipesCursor.count(),
            recipesCursor.limit(config.documentsPerPage).toArray()
        ]);
        return {
            count,
            recipes
        };
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