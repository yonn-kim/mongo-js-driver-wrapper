import { MongoClient } from "mongodb";
import WrappedMongoDb from "./WrappedMongoDb";

export default function(mongoClient:MongoClient) {
    const functionHandler = {
        apply: function(target:Function, thisArg:MongoClient, args:any) {
            return WrappedMongoDb(target.apply(thisArg, args));
        }
    }

    const classHandler = {
        get: function(target:MongoClient, prop:string) {
            const ret = Reflect.get(target, prop);
            if (prop === 'db') {
                return new Proxy(ret, functionHandler);
            }
            return Reflect.get(target, prop);
        }
    }
    return new Proxy(mongoClient, classHandler);
}


