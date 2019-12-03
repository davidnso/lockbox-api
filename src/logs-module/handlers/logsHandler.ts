import { LogsMongoDataStore } from "../drivers/LogsMongoDataStore";

const dataStore = new LogsMongoDataStore();

export async function fetchAccessLogs(){
    try{
        return await dataStore.fetchAllLogs();
    }catch(err){
        console.log('Driver Error: ', err);
    }
}

