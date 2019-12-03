import { ExpressDriver } from "./drivers/express/expressDriver";
import * as http from "http";
import { MongoDriver } from "./drivers";
require("dotenv").config();

const app = ExpressDriver.build();
/**
 * build the express driver and start the application server.
 */
const server = http.createServer(app);
server.listen(process.env.PORT, () => {
  console.log("LockBox Api running on port " + process.env.PORT);
});

// const app = ExpressDriver.build();
// MongoDriver.buildDriver(process.env.DB_URI as string).then(async dataStore => {
//   const userDataStore = await MongoDriver.instantiateConnection("users");
//   new UserMongoDataStore(userDataStore);
//   const server = http.createServer(app);
//   server.listen(process.env.PORT, () => {
//     console.log("LockBox Api running on port " + process.env.PORT);
//   });
//   // new UserMongoDataStore(dataStore);
// });
