import { Db, MongoClient } from "mongodb";
import config from '../../config';

class DBManager {
    public db: Db;
    public initialized: boolean = false;

    public async initialize() {
        if(!this.initialized) {
            this.db = await new Promise<Db>((resolve, reject) => {
                MongoClient.connect(config.mongo.url, (error, client) => {
                    if(error) {
                        reject(error);
                    } else {
                        resolve(client.db(config.mongo.db));
                    }
                });
            });
            this.initialized = true;
        }
    }
}

const dbManager = new DBManager();
dbManager.initialize();

export default dbManager;