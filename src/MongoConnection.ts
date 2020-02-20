import { MongoClient, MongoClientOptions } from "mongodb";
import WrappedMongoClient from "./wrapped/WrappedMongoClient";

export default class MongoConnection {
    client:MongoClient;
    catalog:string = 'admin';
    resultset:object;

    constructor(uri:string, options? :MongoClientOptions) {
        this.client = WrappedMongoClient(new MongoClient(uri, options));
    }

    setCatalog(catalog:string) : void {
        this.catalog = catalog;
    }

    execute(query:string) {
        this.client.connect((err) => {
            if (err != null) {
                throw Error('Db connection error');
            }

            const db = this.client.db(this.catalog);
            this.resultset = eval(query);
            this.client.close();
        })
    }
}