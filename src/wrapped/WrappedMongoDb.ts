import { Db } from "mongodb";

export default function(mongoDb:Db){
      let classHandler = {
        get: function(target:Db, prop:string) {
            const ret = Reflect.get(target, prop);
            if (prop in target) {
                return ret;
            } else {
                return target.collection(prop);
            }
        }
    }
    return new Proxy(mongoDb, classHandler);
}
