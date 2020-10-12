// Modules
import { Db, MongoClient } from 'mongodb';
import config from '../config';

class RecipeRA {
    private db: Db;

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