// Modules
import { Db, MongoClient, ObjectID } from 'mongodb';
import config from '../config';

// Types and Interfaces
import { Recipe } from '../interfaces/recipe';

class RecipeRA {
    private db: Db;

    public async load(id: string): Promise<Recipe> {
        const [ recipe ] = await this.db
            .collection('recipes')
            .find<Recipe>({"_id": ObjectID.createFromHexString(id)})
            .toArray();
        return recipe;
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