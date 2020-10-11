// Modules
import { MongoClient } from 'mongodb';
import config from '../config';

class RecipeRA {
    private client: MongoClient;

    public initialize(): Promise<void> {
        if(!this.client) {
            return new Promise<MongoClient>((resolve, reject) => {
                MongoClient.connect(config.mongo.url, (error, client) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(client);
                });
            })
                .then((client) => {
                    this.client = client;
                });
        }
        return Promise.resolve();
    }
}

const recipeRA = new RecipeRA();
recipeRA.initialize();

export default recipeRA;