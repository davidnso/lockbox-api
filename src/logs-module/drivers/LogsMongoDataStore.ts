import { MongoDriver } from "../../drivers";

export class LogsMongoDataStore{
    logStore:any;
    constructor(){
        MongoDriver.buildDriver(process.env.DB_URI as string,'access-logs' ).then(store=>{
            this.logStore = store;
        })
    }

    async fetchAllLogs(query?:string){
       return await this.logStore.find({}).toArray();
    }
}